"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface House {
  id: string
  images: string[]
  title: string
  timeline: string
  description: string
  price: number
  isGuestFavorite: boolean
  rating: number
}

export default function HouseCard({ house }: { house: House }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === house.images.length - 1 ? prevIndex : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div className="relative w-full h-48">
          <Image
            src={house.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${house.title} - Image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {house.isGuestFavorite && (
          <button className="absolute top-2 left-2 bg-white text-black px-2 py-1 rounded-full text-sm font-semibold">
            Guest Favorite
          </button>
        )}
        <button
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full transition-colors",
            isFavorite ? "bg-yellow-400" : "bg-gray-200 border-2 border-white",
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? "white" : "none"} />
        </button>
        {currentImageIndex > 0 && (
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
            onClick={prevImage}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {currentImageIndex < house.images.length - 1 && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1"
            onClick={nextImage}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {house.images.map((_, index) => (
            <div
              key={index}
              className={cn("w-2 h-2 rounded-full", index === currentImageIndex ? "bg-white" : "bg-white/50")}
            />
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{house.title}</h2>
          <div className="flex items-center bg-gray-800 text-white px-2 py-1 rounded-full">
            <Star className="w-4 h-4 mr-1" />
            <span className="text-sm">{house.rating.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{house.description}</p>
        <span className="text-gray-500">per {house.timeline}</span>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold flex gap-1">
            Ugshs{house.price}
            <span className="font-thin ml-1">per night</span>
          </span>
        </div>
      </div>
    </div>
  )
}

