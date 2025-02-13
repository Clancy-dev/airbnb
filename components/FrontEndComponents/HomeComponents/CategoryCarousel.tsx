"use client"

import { useState, useRef } from "react"
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
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
      setScrollPosition(scrollTo)
    }
  }

  return (
    <div className="relative mb-8">
      <div ref={carouselRef} className="flex overflow-x-auto scrollbar-hide space-x-6 py-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center cursor-pointer ${
              activeCategory === category.id ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.title}
              width={64}
              height={64}
              className="rounded-full"
            />
            <span className="mt-2 text-sm font-medium">{category.title}</span>
          </div>
        ))}
      </div>
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
      <div className="w-full h-1 bg-gray-200 mt-1">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(scrollPosition / (carouselRef.current?.scrollWidth || 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

