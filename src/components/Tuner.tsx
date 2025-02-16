"use client"

import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
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
    return <div className="container mx-auto p-4">
        <div className="mb-4">
            <h2 className="text-2xl">Pitch: <Input disabled value={pitch.toString()} /></h2>
        </div>
        <div className="mb-4">
            <h2 className="text-2xl">Clarity: <Input disabled value={clarity.toString()} /></h2>
        </div>
        <div className="mb-4">
            <h2 className="text-2xl align-center justify-self-center">{note}</h2>
        </div>
        <Button onPress={handleButtonClick} className="flex items-center">
            {audioContext.state === "running" ? <><i className="bi bi-stop-fill mr-2"></i><span>Stop</span></> : <><i className="bi bi-play-fill mr-2"></i><span>Start</span></>}
        </Button>
    </div>
}