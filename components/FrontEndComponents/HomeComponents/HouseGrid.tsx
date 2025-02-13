import Image from "next/image"
import HouseCard from "./HouseCard"

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

interface HouseGridProps {
  houses: House[]
}

export default function HouseGrid({ houses }: HouseGridProps) {
  if (houses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
        <Image src="/placeholder.svg?height=100&width=100" alt="No properties" width={100} height={100} />
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">No properties available</h2>
        <p className="mt-2 text-gray-500">There are no properties in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {houses.map((house) => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>
  )
}

