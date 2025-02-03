import { GoogleGenerativeAI } from '@google/generative-ai'
import { Input } from "@heroui/input"
import { Button } from '@heroui/button'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are an expert in Indian Classical Music. You are supposed to help in context with sura, tala, raga, etc. related to Indian Classical Music."
})

export default async function CreateMusicPage() {
    const response = await useAI("Hello World")
    return <>
        <p>{response.response.text()}</p>

        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 py-2 px-2">
            <Input type="text" className="w-full" endContent={
                <Button className="rounded-lg"><PaperAirplaneIcon /></Button>
            }></Input>
        </div>
    </>
}

async function useAI(prompt: string) {
    const chat = model.startChat()
    const res = await chat.sendMessage(prompt)
    return res
}