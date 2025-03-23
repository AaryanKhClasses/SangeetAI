"use client"

import { Button } from "@heroui/react"
import { Slider, SliderValue } from "@heroui/slider"
import { useState } from "react"

const audioContext = new window.AudioContext()
let currentBeat = 0, nextNoteTime = 0, intervalID: NodeJS.Timeout | null = null

export default function Metronome() {
    const [bpm, setBpm] = useState<SliderValue>(120)
    const [playing, setPlaying] = useState(false)

    function handlePlaying() {
        if (!playing) {
            start(bpm as number)
            setPlaying(true)
        } else {
            clearInterval(intervalID as NodeJS.Timeout)
            setPlaying(false)
        }
    }

    function handleBpmChange(value: SliderValue) {
        setBpm(value)
        if (playing) {
            clearInterval(intervalID as NodeJS.Timeout)
            start(value as number)
        }
    }

    return <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <h1 className="text-5xl font-bold my-8">{bpm} BPM</h1>
            <Slider className="max-w-md mb-8" size="sm" value={bpm} color="foreground" onChange={setBpm} onChangeEnd={handleBpmChange} defaultValue={120} maxValue={240} minValue={1} step={1}
                startContent={ <Button isIconOnly radius="full" onPress={() => setBpm((prev) => (Number(prev) >= 10 ? Number(prev) - 10 : 0))}><i className="bi bi-volume-down-fill"></i></Button> }
                endContent={ <Button isIconOnly radius="full" onPress={() => setBpm((prev) => (Number(prev) <= 230 ? Number(prev) + 10 : 240))}><i className="bi bi-volume-up-fill"></i></Button> }
            />
            <Button className="px-4 py-2 text-lg font-semibold bg-foreground text-background rounded-full text-[#D4AF37] shadow-lg transform transition-transform hover:scale-100 " onPress={() => {setPlaying(!playing); handlePlaying()}}>{playing ? <><i className="bi bi-stop-fill mr-2"></i><span>Stop</span></> : <><i className="bi bi-play-fill mr-2"></i><span>Start</span></>}</Button>
        </div>
    </>
}

function start(bpm: number) {
    currentBeat = 0
    nextNoteTime = audioContext.currentTime + 0.05
    intervalID = setInterval(() => schedule(bpm), 25)
}

function schedule(bpm: number) {
    while(nextNoteTime < audioContext.currentTime + 0.1) {
        scheduleNote(currentBeat, nextNoteTime)
        nextNote(bpm)
    }
}

function scheduleNote(currentBeat: number, time: number) {
    const osc = audioContext.createOscillator()
    const env = audioContext.createGain()
    osc.frequency.value = (currentBeat % 4 == 0) ? 1000 : 800
    env.gain.value = 1
    env.gain.exponentialRampToValueAtTime(1, time + 0.001)
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.02)

    osc.connect(env)
    env.connect(audioContext.destination)

    osc.start(time)
    osc.stop(time + 0.03)
}

function nextNote(bpm: number) {
    nextNoteTime += 60 / bpm
    currentBeat++
    if(currentBeat == 4) currentBeat = 0
}