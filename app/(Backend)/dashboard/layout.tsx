
import { DashboardHeader } from "@/components/DashBoardHeader"
import SideBar from "@/components/SideBar"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen bg-gray-700">
      <DashboardHeader/>
      <div className="w-full flex bg-white h-full">    
      <SideBar/>
      <div className="lg:w-[90%] md:w-[90%] sm:w-[100%] w-[100%] min-h-[85vh] bg-gray-200">{children}</div>
      </div>
    </div>
    
  )
}

