import MetronomeNoSSR from "@/components/NoSSR/Metronome"

export default function MetronomePage() {
    return <>
        <MetronomeNoSSR />
        <footer className="py-4 bg-gray-800 text-center text-sm text-gray-400 m-[-12]">
            <p>&copy; 2025 SangeetAI. All rights reserved.</p>
        </footer>
    </>
}