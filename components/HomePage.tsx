"use client"

import { useState } from "react"
import CategoryCarousel from "../components/CategoryCarousel"
import HouseCard from "../components/HouseCard"
import { Category, House } from "@prisma/client"


// interface HomePageProps {
//   categories: Category[]
//   houses: House[]
// }

const categories = [
  { id: 1, name: "Beachfront", image: "/images/categories/beachfront.jpg" },
  { id: 2, name: "Mountain Retreats", image: "/images/categories/mountain.jpg" },
  { id: 3, name: "City Apartments", image: "/images/categories/city.jpg" },
  { id: 4, name: "Countryside", image: "/images/categories/countryside.jpg" },
  { id: 5, name: "Lakeside", image: "/images/categories/lakeside.jpg" },
  { id: 6, name: "Ski Chalets", image: "/images/categories/ski.jpg" },
  { id: 7, name: "Treehouses", image: "/images/categories/treehouse.jpg" },
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

export default function HomePage({ categories, houses }: { categories: Category[]; houses: House[] }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  const filteredHouses = houses.filter((house) => house.categoryId === selectedCategory)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Your Dream Vacation Home</h1>
      <CategoryCarousel
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredHouses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </main>
  )
}

