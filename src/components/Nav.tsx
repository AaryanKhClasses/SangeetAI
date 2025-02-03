"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar"
import { Link } from "@heroui/link"

export function Nav() {
    return <Navbar>
        <NavbarBrand>
            <span className="text-2xl cursor-pointer mx-2">SangeetAI</span>
        </NavbarBrand>
        <NavbarContent className="flex gap-4 items-center" justify="end">
            <NavbarItem className="hidden md:block"><Link className="text-xl text-primary hover:text-danger" href="/tuner">Tuner</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className="text-xl hover:text-danger" href="/metronome">Metronome</Link></NavbarItem>
            <NavbarItem className="hidden md:block"><Link className="text-xl hover:text-danger" href="/create-music">Create with AI</Link></NavbarItem>
        </NavbarContent>
    </Navbar>
}