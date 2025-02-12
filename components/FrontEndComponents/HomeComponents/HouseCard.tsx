"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ChevronLeft, ChevronRight, Bath, Bed } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 z-10 ${
            isFavorite ? "bg-yellow-400" : "bg-gray-200"
          } border border-white rounded-full`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "text-white" : "text-gray-600"}`} />
        </Button>
        {currentImageIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {currentImageIndex < house.interiorImages.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Link href={`/house/${house.id}`}>
        <div className="p-4">
          <h2 className="font-semibold text-lg mb-2 text-gray-800">{house.title}</h2>
          <p className="text-gray-600 mb-2">{house.location}</p>
          <p className="text-gray-600 mb-2">
            Available: {house.availableFrom} - {house.availableTo}
          </p>
          <p className="font-bold text-lg mb-2">UGX {house.price.toLocaleString()}</p>
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{house.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{house.bedrooms}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

