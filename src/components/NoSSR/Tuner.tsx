"use client"

import dynamic from "next/dynamic"
const TunerNoSSR = dynamic(
    () => import('@/components/Tuner'),
    { ssr: false }
)

export default TunerNoSSR