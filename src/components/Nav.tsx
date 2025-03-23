"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Link, Image } from "@heroui/react"


export function Nav() {
    return <Navbar>
        <NavbarBrand>
            <span className="text-2xl cursor-pointer mx-2 flex flex-row items-center" onClick={() => window.location.href = "/"}>
                <Image src="logo.png" width={150} height={80} alt="SangeetAI Logo" />
            </span>
        </NavbarBrand>
        <NavbarContent className="flex gap-4 items-center" justify="end">
            <NavbarItem className="hidden md:block"><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition " href="/tuner">Tuner</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition" href="/metronome">Metronome</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition" href="/create-music">Create with AI</Link></NavbarItem>
            <NavbarMenuToggle className="md:hidden"></NavbarMenuToggle>
        </NavbarContent>
        <NavbarMenu>
            <NavbarItem><Link className="text-xl text-primary hover:text-danger" href="/tuner">Tuner</Link></NavbarItem>
            <NavbarItem><Link className="text-xl hover:text-danger" href="/metronome">Metronome</Link></NavbarItem>
            <NavbarItem><Link className="text-xl hover:text-danger" href="/create-music">Create with AI</Link></NavbarItem>
        </NavbarMenu>
    </Navbar>
}