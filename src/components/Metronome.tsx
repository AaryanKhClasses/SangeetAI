"use client"

import { Button } from "@heroui/react"
import { Slider, SliderValue } from "@heroui/slider"
import { useState, useEffect, useRef } from "react"

export function Metronome() {
    const [bpm, setBpm] = useState<SliderValue>(120)
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (playing) {
            const interval = (60 / Number(bpm)) * 1000
            intervalRef.current = setInterval(() => {
                if (audioRef.current) {
                    audioRef.current.currentTime = 0
                    audioRef.current.play()
                }
            }, interval)
        } else if (intervalRef.current) clearInterval(intervalRef.current)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [playing, bpm])

    return <>
        <audio ref={audioRef} src="/metronome.wav" aria-label="Metronome Sound" />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <h1 className="text-5xl font-bold my-8">{bpm} BPM</h1>
            <Slider className="max-w-md mb-8" size="sm" value={bpm} color="foreground" onChange={setBpm} defaultValue={120} maxValue={240} minValue={1} step={1}
                startContent={ <Button isIconOnly radius="full" onPress={() => setBpm((prev) => (Number(prev) >= 10 ? Number(prev) - 10 : 0))}><i className="bi bi-volume-down-fill"></i></Button> }
                endContent={ <Button isIconOnly radius="full" onPress={() => setBpm((prev) => (Number(prev) <= 230 ? Number(prev) + 10 : 240))}><i className="bi bi-volume-up-fill"></i></Button> }
            />
            <Button className="px-4 py-2 text-lg font-semibold bg-foreground text-background rounded-full" onPress={() => setPlaying(!playing)}>{playing ? <><i className="bi bi-stop-fill mr-2"></i><span>Stop</span></> : <><i className="bi bi-play-fill mr-2"></i><span>Start</span></>}</Button>
        </div>
    </>
}