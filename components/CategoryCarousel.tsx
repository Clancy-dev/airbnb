"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Category {
  id: string
  title: string
  image: string
}

interface CategoryCarouselProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (id: string) => void
}

export default function CategoryCarousel({ categories, selectedCategory, onSelectCategory }: CategoryCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCategories = categories.slice(startIndex, startIndex + 10)

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(categories.length - 10, startIndex + 1))
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        disabled={startIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div className="flex overflow-hidden px-12">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            className={`flex flex-col items-center justify-center p-2 mx-3 transition-all ${
              category.id === selectedCategory
                ? "text-black border-b-2 border-black scale-110"
                : "text-gray-600 hover:text-black hover:scale-105"
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="relative w-16 h-16 mb-2 overflow-hidden rounded-[10px]">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium">{category.title}</span>
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        disabled={startIndex >= categories.length - 5}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

