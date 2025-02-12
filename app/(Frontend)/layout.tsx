import Header from "@/components/FrontEndComponents/Header/Header"
import React from "react"


export default function FrontEndLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
     <Header/>
     {children}
    </div>
  )
}

