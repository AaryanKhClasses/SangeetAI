"use client"

import { Button, Card, CardBody, Link } from "@heroui/react"
import { useEffect, useRef } from "react"

export default function Home() {
    const sectionRef = useRef<HTMLDivElement>(null)
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
    }, [])

    return <>
        <div className="items-center justify-center flex flex-col p-4 h-screen">
            <div className="flex flex-row items-center space-x-2">
                <h1 className="text-[5rem] font-bold text-white">Sangeet</h1> 
                <span className="text-[3em] font-bold p-2 rounded-md border-large text-white">AI</span>
            </div>
            <p className="text-center text-foreground text-[1.5em] text-gray-300">Tune In With AI</p>

            <div className="flex items-center justify-center mt-4">
                <Button as={Link} href="/create-music" className="flex items-center text-[1.5rem] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-2 px-4 rounded-md shadow-lg transform transition-transform hover:scale-105">
                    <i className="bi bi-music-note-beamed mr-2"></i>Start Creating Now!
                </Button>
            </div>
        </div>
        <div ref={sectionRef}>
            <Card className="p-4 m-4 bg-[#d50409] text-white">
                <CardBody className="flex flex-col">
                    <h1 className="text-[2rem] font-bold">Tuner</h1>
                    <p className="text-[#f1f1f1]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita excepturi dignissimos veniam, possimus nihil iure laborum reiciendis, rem animi reprehenderit, aliquam similique repudiandae modi et eum nam! Eum, in quisquam?
                    Voluptatem quos labore iste cum. Saepe veniam id assumenda labore consequuntur fugiat molestias consectetur, impedit necessitatibus aspernatur similique fuga modi? Hic fugit doloremque enim aspernatur reprehenderit delectus inventore iste deleniti.</p>
                    <Button as={Link} href='/tuner' className="mt-2 bg-[#112c33]">Check It Out!</Button>
                </CardBody>
            </Card>
            <Card className="p-4 m-4 bg-[#d50409] text-white">
                <CardBody className="flex flex-col">
                    <h1 className="text-[2rem] font-bold text-right">Metronome</h1>
                    <p className="text-[#f1f1f1] text-right">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita excepturi dignissimos veniam, possimus nihil iure laborum reiciendis, rem animi reprehenderit, aliquam similique repudiandae modi et eum nam! Eum, in quisquam?
                    Voluptatem quos labore iste cum. Saepe veniam id assumenda labore consequuntur fugiat molestias consectetur, impedit necessitatibus aspernatur similique fuga modi? Hic fugit doloremque enim aspernatur reprehenderit delectus inventore iste deleniti.</p>
                    <Button as={Link} href='/metronome' className="mt-2 bg-[#112c33]">Try It Now!</Button>
                </CardBody>
            </Card>
            <Card className="p-4 m-4 bg-[#d50409] text-white">
                <CardBody className="flex flex-col">
                    <h1 className="text-[2rem] font-bold">Create With AI</h1>
                    <p className="text-[#f1f1f1]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita excepturi dignissimos veniam, possimus nihil iure laborum reiciendis, rem animi reprehenderit, aliquam similique repudiandae modi et eum nam! Eum, in quisquam?
                    Voluptatem quos labore iste cum. Saepe veniam id assumenda labore consequuntur fugiat molestias consectetur, impedit necessitatibus aspernatur similique fuga modi? Hic fugit doloremque enim aspernatur reprehenderit delectus inventore iste deleniti.</p>
                    <Button as={Link} href='/create-music' className="mt-2 bg-[#112c33]">Start Creating!</Button>
                </CardBody>
            </Card>
        </div>
    </>
}