"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { UserProfile } from "./UserProfile"
import { NotificationIcon } from "./NotificationIcon"
import { ResponsiveMenu } from "./ResponsiveMenu"
import { UserRole } from "@prisma/client"

type AuthUser = {
  fullName: string
  role: UserRole
  email: string
  imageUrl: string
}


export function DashboardHeader({user}:{user:AuthUser}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Effect to disable scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <header className="bg-white shadow-md z-50 w-full h-[72px] py-3">
      <div className="container mx-auto px-4 w-full h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Company Logo */}
            <Image src="/ac-logo.png" alt="Company Logo" width={85} height={40} className="rounded-full" />
            
          </div>
          

          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <NotificationIcon />

            {/* User Profile */}
            <UserProfile user={user} />

            {/* Responsive Menu Icon */}
            <div className="sm:hidden">
              <motion.button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                whileTap={{ scale: 0.97 }}
              >
                <motion.div initial={false} animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Menu */}
      <ResponsiveMenu isOpen={isMenuOpen} />
    </header>
  )
}

