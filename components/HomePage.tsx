"use client"

import { useState } from "react"
import Link from "next/link"
import CategoryCarousel from "./CategoryCarousel"
import HouseCard from "./HouseCard"

const categories = [
  { id: 1, name: "Rooms", icon: "Home" },
  { id: 2, name: "Icons", icon: "Landmark" },
  { id: 3, name: "Bed and Breakfast", icon: "Coffee" },
  { id: 4, name: "Amazing Pools", icon: "Droplets" },
  { id: 5, name: "Cabins", icon: "Trees" },
  { id: 6, name: "Earth Homes", icon: "Mountain" },
  { id: 7, name: "Farms", icon: "Wheat" },
  { id: 8, name: "Countryside", icon: "Mountain" },
  { id: 9, name: "Mansions", icon: "Building" },
]

const houses = [
  {
    id: 1,
    categoryId: 1,
    image: "/placeholder.svg",
    city: "New York",
    description: "Cozy apartment in the heart of Manhattan",
    price: 150,
    time: "night",
  },
  {
    id: 2,
    categoryId: 2,
    image: "/placeholder.svg",
    city: "Paris",
    description: "Iconic studio near the Eiffel Tower",
    price: 200,
    time: "night",
  },
  {
    id: 3,
    categoryId: 3,
    image: "/placeholder.svg",
    city: "London",
    description: "Charming B&B in Notting Hill",
    price: 100,
    time: "night",
  },
  {
    id: 4,
    categoryId: 4,
    image: "/placeholder.svg",
    city: "Los Angeles",
    description: "Modern house with infinity pool",
    price: 500,
    time: "night",
  },
  {
    id: 5,
    categoryId: 5,
    image: "/placeholder.svg",
    city: "Aspen",
    description: "Rustic cabin in the mountains",
    price: 300,
    time: "night",
  },
  {
    id: 6,
    categoryId: 6,
    image: "/placeholder.svg",
    city: "Sedona",
    description: "Unique earth home with stunning views",
    price: 250,
    time: "night",
  },
  {
    id: 7,
    categoryId: 7,
    image: "/placeholder.svg",
    city: "Tuscany",
    description: "Beautiful farmhouse with vineyard",
    price: 400,
    time: "night",
  },
  {
    id: 8,
    categoryId: 8,
    image: "/placeholder.svg",
    city: "Cotswolds",
    description: "Quaint cottage in the English countryside",
    price: 180,
    time: "night",
  },
  {
    id: 9,
    categoryId: 9,
    image: "/placeholder.svg",
    city: "Beverly Hills",
    description: "Luxurious mansion with private cinema",
    price: 1000,
    time: "night",
  },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  const filteredHouses = houses.filter((house) => house.categoryId === selectedCategory)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Your Dream Home</h1>
      <CategoryCarousel
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredHouses.map((house) => (
          <Link href={`/house/${house.id}`} key={house.id}>
            <HouseCard house={house} />
          </Link>
        ))}
      </div>
    </main>
  )
}

