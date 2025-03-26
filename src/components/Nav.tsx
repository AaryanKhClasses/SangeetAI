"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Link, Image, NavbarMenuItem } from "@heroui/react"

export function Nav() {
    return <Navbar isBordered={true} className="border-black">
        <NavbarBrand>
            <span className="text-2xl cursor-pointer mx-2 flex flex-row items-center" onClick={() => window.location.href = "/"}>
                <Image src="logo.png" width={150} height={80} alt="SangeetAI Logo" />
            </span>
        </NavbarBrand>
        <NavbarContent className="flex gap-4 items-center" justify="end">
            <NavbarItem className="hidden md:block"><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition " href="/tuner">Tuner</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition" href="/metronome">Metronome</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition" href="/create-music">Create with AI</Link></NavbarItem>
            <NavbarMenuToggle className="md:hidden" />
        </NavbarContent>
        <NavbarMenu>
            <NavbarMenuItem><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition " href="/tuner">Tuner</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition " href="/metronome">Metronome</Link></NavbarMenuItem>
            <NavbarMenuItem><Link className="text-shadow: 0px 0px 4px rgba(255, 215, 0, 0.6); text-white text-2xl hover:text-[#351414] transition " href="/create-music">Create with AI</Link></NavbarMenuItem>
        </NavbarMenu>
    </Navbar>
}