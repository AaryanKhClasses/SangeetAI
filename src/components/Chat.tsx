"use client"

import { useState } from 'react'
import { Input } from "@heroui/input"
import { Button } from '@heroui/button'
import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import ReactMarkdown from 'react-markdown'

export function Chat({ apiKey }: { apiKey: string }) {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You are an expert in Indian Classical Music. You are supposed to help in context with sura, tala, raga, etc. related to Indian Classical Music."
    })
    
    const chat = model.startChat()

    const [prompt, setPrompt] = useState("")
    const [userMessages, setUserMessages] = useState<string[]>([])
    const [aiMessages, setAiMessages] = useState<string[]>([])

    const handleClick = async () => {
        setUserMessages([...userMessages, prompt])
        console.log(userMessages)
        const res = await useAI(prompt, chat)
        setPrompt("")
        setAiMessages([...aiMessages, res.response.text()])
    }

    return <>
        <div className="chat py-10">
            {userMessages.map((msg, i) => (
                <div key={i}>
                    <div className="text-right">
                        <div className="inline-block p-2 m-1 rounded-lg border border-gray-300 max-w-[90%] break-all">{msg}</div>
                    </div>
                    {aiMessages[i] && (
                        <div className="text-left">
                            <div className="inline-block p-2 m-1 rounded-lg border border-gray-300 max-w-[90%] break-words">
                                <ReactMarkdown>{aiMessages[i]}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 py-2 px-2">
            <Input type="text" className="w-full" value={prompt} onChange={(e) => setPrompt(e.target.value)} endContent={
                <Button className="rounded-full bg-transparent hover:bg-primary" onPress={handleClick}><PaperAirplaneIcon /></Button>
            } />
        </div>
    </>

    async function useAI(prompt: string, chat: ChatSession) {
        const res = await chat.sendMessage(prompt)
        return res
    }
}