import { Chat } from "@/components/Chat"

export default function CreateMusicPage() {
    return <Chat apiKey={process.env.GEMINI_API_KEY as string} />
}