"use client"

import { useState, useEffect } from 'react'
import { Input } from "@heroui/input"
import { Button } from '@heroui/button'
import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai'
import ReactMarkdown from 'react-markdown'
import { Image } from '@heroui/react'

export function Chat({ apiKey }: { apiKey: string }) {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You are an expert in Indian Classical Music. You are supposed to help in context with sura, tala, raga, etc. related to Indian Classical Music. Also while givivng output, enter newlines wherever necessary to generate a good looking output."
    })
    
    const chat = model.startChat()

    const [prompt, setPrompt] = useState("")
    const [userMessages, setUserMessages] = useState<string[]>([])
    const [aiMessages, setAiMessages] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const dots = ['.', '..', '...']

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (loading) {
            interval = setInterval(() => {
                setAiMessages((prev) => {
                    const lastMessage = prev[prev.length - 1]
                    const nextDots = dots[(dots.indexOf(lastMessage.replace('Generating Output', '').trim()) + 1) % dots.length]
                    return [...prev.slice(0, -1), `Generating Output ${nextDots}`]
                })
            }, 500)
        }
        return () => clearInterval(interval)
    }, [loading, dots])

    const handleClick = async () => {
        if (!prompt.trim()) return
        setUserMessages([...userMessages, prompt])
        setPrompt("")
        setLoading(true)
        setAiMessages([...aiMessages, `Generating Output ${dots[0]}`])
        const res = await UseAI(prompt, chat)
        setLoading(false)
        setAiMessages((prev) => prev.slice(0, -1).concat(res.response.text()))
    }

    return <>
        <div className="flex flex-col h-screen">
            {!aiMessages.length && !userMessages.length && (
                <div className="new_page flex flex-col items-center justify-center h-full w-full text-center">
                    <h1 className="text-3xl font-bold">Welcome to SangeetAI Chat!</h1>
                    <p className="text-lg">SangeetAI is an AI that can generate Indian Classical Music. You can ask questions related to Indian Classical Music and get answers from SangeetAI.</p>
                    <div className="w-full bg-background py-2 px-4 flex gap-2 items-center justify-center">
                        <Button variant="flat" className="flex h-14 flex-col gap-0" onPress={() => setPrompt("What is Raga?")}>What is Raga?</Button>
                        <Button variant="flat" className="flex h-14 flex-col gap-0" onPress={() => setPrompt("What is Tala?")}>What is Tala?</Button>
                        <Button variant="flat" className="flex h-14 flex-col gap-0" onPress={() => setPrompt("Give Info About Yaman Raga.")}>Give Info About Yaman Raga.</Button>
                    </div>
                </div>
            )}
            <div className="chat py-20 flex-grow">
                {userMessages.map((msg, i) => (
                    <div key={i}>
                        <div className="text-right">
                            <div className="inline-block p-2 m-1 rounded-lg bg-[#363636] border-[#444444] max-w-[90%] break-all">{msg}</div>
                        </div>
                        {aiMessages[i] && (
                            <div className="text-left flex">
                                <Image width={60} height={60} alt="AIAvatar" src="icon.png" />
                                <div className="inline-block p-2 m-1 rounded-lg bg-[#212327] border-[#444444] max-w-[90%] break-words">
                                    <ReactMarkdown>{aiMessages[i]}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 w-full pt-2 px-4 border-gray-300 bg-background">
                <div className="flex items-center">
                    <Input type="text" className="flex-grow mr-2" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }} />
                    <Button variant="flat" color="default" className="rounded-full text-white hover:bg-primary-dark" onPress={handleClick}>
                        <i className="bi bi-send-fill"></i>
                    </Button>
                </div>
                <p className="text-tiny text-white">SangeetAI can make mistakes. Consider checking important information.</p>
            </div>
        </div>
    </>

    async function UseAI(prompt: string, chat: ChatSession) {
        const res = await chat.sendMessage(prompt)
        return res
    }
}