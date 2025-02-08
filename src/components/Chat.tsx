"use client"

import { useState } from 'react'
import { Input } from "@heroui/input"
import { Button } from '@heroui/button'
import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai'
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
        <div className="chat py-10 flex-grow">
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
        <div className="fixed bottom-0 left-0 w-full py-2 px-4 border-t border-gray-300">
            <div className="flex items-center">
            <Input type="text" className="flex-grow mr-2" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <Button className="rounded-full bg-primary text-white hover:bg-primary-dark" onPress={handleClick}>
                <i className="bi bi-send-fill"></i>
            </Button>
            </div>
        </div>
    </>

    async function useAI(prompt: string, chat: ChatSession) {
        const res = await chat.sendMessage(prompt)
        return res
    }
}