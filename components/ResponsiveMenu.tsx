"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, BarChart2, Users, Settings, Globe, House, Grid } from "lucide-react"

import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: Grid, label: "Categories", href: "/dashboard/categories" },
  { icon: House, label: "Houses", href: "/dashboard/houses" },
  { icon: Globe, label: "Live Website", href: "/" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function ResponsiveMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg sm:hidden"
        >
          <nav className="px-4 py-2 h-screen space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

