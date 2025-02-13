"use client"

import { useState } from "react"
import CategoryCarousel from "./CategoryCarousel"
import HouseGrid from "./HouseGrid"

interface Category {
  id: string
  title: string
  image: string
}

interface House {
  id:string
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

interface HomePageProps {
  categories: Category[]
  houses: House[]
}

export default function HomePage({ categories, houses }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id)

  const filteredHouses = houses.filter((house) => house.categoryId === activeCategory)

  return (
    <div className="container mx-auto">
      <CategoryCarousel categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <HouseGrid houses={filteredHouses} />
    </div>
  )
}

