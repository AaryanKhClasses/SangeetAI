"use client"

import dynamic from "next/dynamic"
const MetronomeNoSSR = dynamic(
    () => import('@/components/Metronome'),
    { ssr: false }
)

export default MetronomeNoSSR