"use client"

import { Button, Card, CardBody, Image, Link } from "@heroui/react"
import { useEffect, useRef, useMemo } from "react"

export default function Home() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const dots = useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => i);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { 
                const children = entry.target.children;
                if (entry.isIntersecting) {
                    for (let i = 0; i < children.length; i++) {
                        setTimeout(() => {
                            children[i].classList.add("fade-in")
                            children[i].classList.remove("opacity-0")
                        }, i * 200);
                    }
                } else {
                    for (let i = 0; i < children.length; i++) {
                        children[i].classList.remove("fade-in")
                        children[i].classList.add("opacity-0")
                    }
                }
            })
        }, { threshold: 0.1 })

        const section = sectionRef.current
        if (section) {
            const children = section.children
            for (let i = 0; i < children.length; i++) observer.observe(children[i])
        }

        return () => {
            if (section) {
                const children = section.children
                for (let i = 0; i < children.length; i++) observer.unobserve(children[i])
            }
        }
    }, [dots])

    return <>
        <div className="items-center justify-center flex flex-col p-4 h-screen">
            <div className="p-12 rounded-xl shadow-5xl">
                <div className="flex flex-row items-center space-x-2">
                    <h1 className="text-[5rem] font-bold text-white">Sangeet</h1> 
                    <span className="text-[3em] p-2 rounded-md border-large text-gray-900 bg-white font-extrabold">AI</span>
                </div>
                <p className="text-center text-foreground text-[1.5em] text-gray-300">Tune In With AI</p>

                <div className="flex items-center justify-center mt-4">
                    <Button as={Link} href="/create-music" className="flex items-center text-[1.5rem] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-2 px-4 rounded-md shadow-lg transform transition-transform hover:scale-105 hover:from-[#FFD700] hover:to-orange-500 active:bg-orange-600">
                        <i className="bi bi-music-note-beamed mr-2"></i>Start Creating Now!
                    </Button>
                </div>
            </div>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:gap-0 gap-4 p-4">
            <Card className="p-4 md:m-4 from bg-[#00000099] text-white">
                <CardBody className="flex md:flex-row flex-col-reverse items-center justify-center gap-10">
                    <div className="flex-col flex md:w-1/2">
                        <h1 className="text-[2rem] font-bold text-[#FFFFF0]">Tuner</h1>
                        <p className="text-[#f1f1f1]">Unlock the full potential of precision with our online tuner! Whether you're perfecting your instrument's pitch or fine-tuning settings for peak performance, our intuitive tuner is here to guide you. With real-time feedback, seamless controls, and a sleek interface, making adjustments has never been this effortless—or this fun. Simply open the tuner, follow the visual cues, and watch as perfection takes shape before your eyes. No guesswork, no hassle—just pure, refined accuracy at your fingertips. Ready to fine-tune like a pro? Dive in and experience the difference! </p>
                    <Button as={Link} href='/tuner' className="mt-2 bg-gradient-to-r from-[#FFD700] to-[#B22222] shadow-medium transition-shadow">Check It Out!</Button>
                    </div>
                    <Image src="tuner.png" alt="tuner" width={350} height={350} />
                </CardBody>
            </Card>
            <Card className="p-4 md:m-4 bg-gradient-to-r bg-[#00000099] text-white">
            <CardBody className="flex md:flex-row-reverse flex-col-reverse items-center justify-center gap-10">
                    <div className="flex-col flex md:w-1/2">
                        <h1 className="text-[2rem] font-bold text-[#FFFFF0]">Metronome</h1>
                        <p className="text-[#f1f1f1]">Stay in perfect rhythm with our online metronome! Whether you're a musician mastering tempo or just looking to sharpen your timing, our sleek and easy-to-use metronome keeps you on beat every step of the way. Set your desired tempo, customize the time signature, and let the steady pulse guide your practice with precision. With its intuitive design and real-time responsiveness, you'll never miss a beat—literally. Say goodbye to inconsistent timing and hello to flawless rhythm. Ready to lock into the groove? Start the metronome and feel the beat take over! </p>
                    <Button as={Link} href='/metronome' className="mt-2 bg-gradient-to-r from-[#FFD700] to-[#B22222] shadow-medium transition-shadow">Check It Out!</Button>
                    </div>
                    <Image src="metronome.png" alt="Metronome" width={350} height={350} />
                </CardBody>
            </Card> 
            <Card className="p-4 md:m-4 bg-[#00000099] text-white">
            <CardBody className="flex md:flex-row flex-col-reverse items-center justify-center gap-10">
                    <div className="flex-col flex md:w-1/2">
                        <h1 className="text-[2rem] font-bold text-[#FFFFF0]">Create with AI</h1>
                        <p className="text-[#f1f1f1]">Unleash your creativity with the power of AI! Whether you're crafting stunning visuals, generating unique ideas, or exploring new artistic possibilities, our AI-powered tool is here to transform your imagination into reality. Simply input your vision, tweak the settings, and watch as AI brings your concepts to life with breathtaking precision. No complex skills required—just pure creativity at your fingertips. Ready to create something extraordinary? Dive in and let AI elevate your artistry to the next level! </p>
                    <Button as={Link} href='/create-music' className="mt-2 bg-gradient-to-r from-[#FFD700] to-[#B22222] shadow-medium transition-shadow">Check It Out!</Button>
                    </div>
                    <Image src="create.png" alt="Create with AI" width={350} height={350} />
                </CardBody>
            </Card>
        </div>
    </>
}