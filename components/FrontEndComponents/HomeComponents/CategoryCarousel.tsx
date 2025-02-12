"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  title: string
  image: string
}

interface CategoryCarouselProps {
  categories: Category[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function CategoryCarousel({ categories, activeCategory, setActiveCategory }: CategoryCarouselProps) {
  const [showMore, setShowMore] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const visibleCategories = showMore ? categories : categories.slice(0, 10)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // Adjust this value as needed
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0
    }
  }, [])

  return (
    <div className="relative mb-8">
      <div ref={carouselRef} className="flex overflow-x-auto pb-4 scrollbar-hide pl-4 md:pl-0">
        {visibleCategories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={`flex-shrink-0 mr-4 transition-transform duration-300 ${
              activeCategory === category.id ? "scale-110 border-b-2 border-black bg-orange-100" : ""
            } ${index === 0 ? "md:ml-0" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveCategory(category.id)
            }}
          >
            <div className="w-20 h-14 relative rounded-lg overflow-hidden">
              <Image src={category.image || "/placeholder.svg"} alt={category.title} layout="fill" objectFit="cover" />
            </div>
            <p className="mt-2 text-center font-medium">{category.title}</p>
          </Link>
        ))}
      </div>
      {isLargeScreen && !showMore && categories.length > 5 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:flex"
          onClick={() => setShowMore(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

