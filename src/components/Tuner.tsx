"use client"

import { Button } from "@heroui/button"
import { PitchDetector } from "pitchy"
import { useCallback, useEffect, useState } from "react"

const audioContext = new window.AudioContext()
const analyserNode = audioContext.createAnalyser()

const noteFrequencies = [
    { note: "Sa (C)", frequency: 261.63 },
    { note: "Re (D)", frequency: 293.66 },
    { note: "Ga (E)", frequency: 329.63 },
    { note: "Ma (F)", frequency: 349.23 },
    { note: "Pa (G)", frequency: 392.00 },
    { note: "Dha (A)", frequency: 440.00 },
    { note: "Ni (B)", frequency: 493.88 }
]

function getNearestNote(pitch: number) {
    let minDiff = Infinity
    let nearestNote = ""
    for (const { note, frequency } of noteFrequencies) {
        const diff = Math.abs(pitch - frequency)
        if (diff < minDiff) {
            minDiff = diff
            nearestNote = note
        }
    }
    return nearestNote
}

export default function Tuner() {
    const [pitch, setPitch] = useState(0)
    const [clarity, setClarity] = useState(0)
    const [note, setNote] = useState("")
    useEffect(() => {
        let mediaStream: MediaStream
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            mediaStream = stream
            audioContext.createMediaStreamSource(stream).connect(analyserNode)
            const detector = PitchDetector.forFloat32Array(analyserNode.fftSize)
            detector.minVolumeDecibels = -100
            const input = new Float32Array(analyserNode.fftSize)
            const update = () => {
                analyserNode.getFloatTimeDomainData(input)
                const [outPitch, clarity] = detector.findPitch(input, audioContext.sampleRate)
                setPitch(Math.round(outPitch * 10) / 10)
                setClarity(Math.round(clarity * 100) / 100)
                setNote(getNearestNote(outPitch))
                requestAnimationFrame(update)
            }
            update()
        }).catch(error => {
            console.error("Error accessing microphone: ", error)
        })
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop())
            }
            audioContext.close()
        }
    }, [])
    const handleButtonClick = useCallback(() => {
        if (audioContext.state === "running") audioContext.suspend()
        else audioContext.resume()
    }, [])
    return <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <h1 className="text-5xl font-bold mb-8">Pitch: {pitch.toString()}</h1>
        <h1 className="text-5xl font-bold mb-8">Clarity: {clarity.toString()}</h1>
        <h1 className="text-5xl font-bold mb-8">Note: {note || "Not Playing"}</h1>
        <Button className="px-4 py-2 text-lg font-semibold bg-foreground text-background rounded-full text-[#D4AF37] shadow-lg transform transition-transform hover:scale-100 " onPress={handleButtonClick}>
            {audioContext.state === "running" ? <><i className="bi bi-stop-fill mr-2"></i><span>Stop</span></> : <><i className="bi bi-play-fill mr-2"></i><span>Start</span></>}
        </Button>
    </div>
}