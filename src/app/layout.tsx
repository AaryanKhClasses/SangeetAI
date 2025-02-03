import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Provider } from "./providers"
import "./globals.css"
import { Nav } from "@/components/Nav"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "SangeetAI",
    description: "An AI App that Generates Indian Classical Music.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="dark">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Provider>
                    <Nav />
                    <div className="container my-6 px-3">{children}</div>
                </Provider>
            </body>
        </html>
    )
}
