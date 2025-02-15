"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, Star, Bath, Bed } from "lucide-react"

interface House {
  id: string
  title: string
  price: number
  location: string
  slug: string
  description: string
  categoryId: string
  categoryTitle: string
  availableFrom: string
  availableTo: string
  bedrooms: string
  bathrooms: string
  sittingRooms: string
  diningRooms: string
  kitchens: string
  hasParking: boolean
  electricityType: string
  waterSupply: string
  floorType: string
  ceilingType: string
  interiorFeatures: string
  livingArrangement: string
  roofType: string
  fencingType: string
  exteriorFeatures: string
  securityFeatures: string
  neighbours: string
  titleDeedType: string
  legalInformation: string
  interiorImages: string[]
  exteriorImages: string[]
  rating: number
}

interface HouseCardProps {
  house: House
}

export default function HouseCard({ house }: HouseCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === house.interiorImages.length - 1 ? prevIndex : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={house.interiorImages[currentImageIndex] || "/placeholder.svg"}
          alt={house.title}
          layout="fill"
          objectFit="cover"
        />
        {currentImageIndex > 0 && (
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {currentImageIndex < house.interiorImages.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
          >
            <ChevronRight size={20} />
          </button>
        )}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {house.interiorImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-gray-300"}`}
            ></div>
          ))}
        </div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-2 right-2 p-2 rounded-full ${isFavorite ? "bg-yellow-400" : "bg-gray-200"}`}
        >
          <Heart size={20} className={isFavorite ? "text-white" : "text-gray-600"} />
        </button>
      </div>
      <Link href={`/${house.slug}`}>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{house.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{house.location}</p>
          <p className="text-sm text-gray-500 mb-2">
            Available: {house.availableFrom} - {house.availableTo}
          </p>
          <div className="flex items-center mb-2">
            <Star className="text-black mr-1" size={16} />
            <span className="text-sm">{house.rating.toFixed(1)}</span>
          </div>
          <p className="font-bold mb-2">UGX {house.price.toLocaleString()}</p>
          <div className="flex items-center text-gray-600">
            <Bath size={16} className="mr-1" />
            <span className="text-sm mr-4">{house.bathrooms}</span>
            <Bed size={16} className="mr-1" />
            <span className="text-sm">{house.bedrooms}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

