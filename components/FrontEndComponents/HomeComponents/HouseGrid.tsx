import { Home } from "lucide-react"
import HouseCard from "@/components/FrontEndComponents/HomeComponents/HouseCard"

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

interface HouseGridProps {
  houses: House[]
}

export default function HouseGrid({ houses }: HouseGridProps) {
  if (houses.length === 0) {
    return (
      <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg bg-muted/50">
        <div className="flex flex-col items-center gap-2">
          <Home className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-semibold">No Houses Available</h3>
          <p className="text-sm text-muted-foreground max-w-[500px]">
            There are currently no houses listed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {houses.map((house) => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>
  )
}

