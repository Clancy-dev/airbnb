import HouseCard from "@/components/FrontEndComponents/HomeComponents/HouseCard"

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {houses.map((house) => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>
  )
}

