"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Category {
  id: string
  title: string
  image: string
}

interface CategoryCarouselProps {
  categories: Category[]
  activeCategory: string
  setActiveCategory: (id: string) => void
}

export default function CategoryCarousel({ categories, activeCategory, setActiveCategory }: CategoryCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showArrows, setShowArrows] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth >= 1024) // Show arrows only on lg screens and above
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    document.head.insertAdjacentHTML("beforeend", scrollbarStyles)
    return () => {
      const style = document.head.querySelector("style:last-of-type")
      if (style) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
      setScrollPosition(scrollTo)
    }
  }

  return (
    <div className="relative mb-8 px-4 lg:px-14">
      <div ref={carouselRef} className="flex overflow-x-auto space-x-6 py-4 custom-scrollbar lg:scrollbar-none">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex-shrink-0 flex flex-col items-center cursor-pointer w-32 sm:w-40 ${
              activeCategory === category.id ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <div className="w-full h-[80%] flex items-center justify-center">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                width={64}
                height={64}
                className="w-14 h-14"
              />
            </div>
            <div className="min-h-[20%] w-full p-1 flex items-center justify-center">
              <span className="text-sm font-medium text-center">{category.title}</span>
            </div>
          </div>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            style={{ display: scrollPosition === 0 ? "none" : "block" }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      <div className="w-full h-1 bg-gray-200 lg:block hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(scrollPosition / (carouselRef.current?.scrollWidth || 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

const scrollbarStyles = `
  <style>
    .custom-scrollbar::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
      border: 2px solid #f1f1f1;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  </style>
`

