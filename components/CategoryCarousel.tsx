"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as Icons from "lucide-react"


interface Category {
  id: number
  name: string
  icon: string
}

interface CategoryCarouselProps {
  categories: Category[]
  selectedCategory: number
  onSelectCategory: (id: number) => void
}

export default function CategoryCarousel({ categories, selectedCategory, onSelectCategory }: CategoryCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCategories = categories.slice(startIndex, startIndex + 5)

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(categories.length - 5, startIndex + 1))
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
        disabled={startIndex === 0}
      >
        <ChevronLeft />
      </button>
      <div className="flex overflow-hidden px-10">
        {visibleCategories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons]
          return (
            <button
              key={category.id}
              className={`flex flex-col items-center justify-center p-1 mx-2 transition-colors ${
                category.id === selectedCategory
                  ? " text-black border-b-2 border-black"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <IconComponent className="w-6 h-6 mb-2"/>
              <span className="text-sm">{category.name}</span>
            </button>
          )
        })}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
        disabled={startIndex >= categories.length - 5}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

