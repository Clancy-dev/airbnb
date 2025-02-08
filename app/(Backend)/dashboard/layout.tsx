import Link from "next/link"
import { Home, Grid, HomeIcon as House } from "lucide-react"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Link href="/dashboard" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200">
            <Home className="mr-2 h-4 w-4" />
            Overview
          </Link>
          <Link href="/dashboard/categories" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200">
            <Grid className="mr-2 h-4 w-4" />
            Categories
          </Link>
          <Link href="/dashboard/houses" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200">
            <House className="mr-2 h-4 w-4" />
            Houses
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}

