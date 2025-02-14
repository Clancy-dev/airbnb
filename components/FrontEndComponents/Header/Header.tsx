"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Home, LayoutDashboard, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

const NavLink = ({
  href,
  icon: Icon,
  children,
  onClick,
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  onClick?: () => void
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 transition-all duration-300",
        isActive ? "font-bold text-black border-b-2 border-black" : "text-gray-600 hover:text-black",
      )}
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  )
}

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <div
      className={cn(
        "fixed inset-x-0 top-16 bottom-0 bg-white z-50 transform transition-all duration-500 ease-in-out",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 pointer-events-none",
      )}
    >
      <nav className="flex flex-col p-4 space-y-4">
        <NavLink href="/" icon={Home} onClick={onClose}>
          Home
        </NavLink>
        <NavLink href="/dashboard" icon={LayoutDashboard} onClick={onClose}>
          Dashboard
        </NavLink>
      </nav>
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={cn("bg-white border-b boder-[1px] transition-shadow duration-300 ease-in-out", isMenuOpen ? "shadow-lg" : "shadow-md")}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image src="/ac-logo.png" alt="Logo" width={160} height={80} className="mr-4" />
          </div>
          <nav className="hidden md:flex space-x-4">
            <NavLink href="/" icon={Home}>
              Home
            </NavLink>
            <NavLink href="/dashboard" icon={LayoutDashboard}>
              Dashboard
            </NavLink>
          </nav>
          <button className="md:hidden focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
            <div className="relative w-6 h-6">
              <Menu
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  isMenuOpen ? "opacity-0 rotate-180 scale-50" : "opacity-100 rotate-0 scale-100",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-50",
                )}
              />
            </div>
          </button>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}

