import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReservationForm from "@/components/Forms/ReserveForm"


type HouseProps = {
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

export default function HouseDetailedPage({ house }: { house: HouseProps }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-3 row-span-2">
              <Image
                src={house.interiorImages[0] || "/placeholder.svg"}
                alt={house.title}
                width={800}
                height={600}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            {house.interiorImages.slice(1, 5).map((image, index) => (
              <div key={index} className={`relative ${index === 3 ? "col-span-2 md:col-span-1" : ""}`}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${house.title} interior ${index + 2}`}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-full"
                />
                {index === 3 && (
                  <Link
                    href={`/${house.slug}/gallery`}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
                  >
                    <Button variant="secondary" className="flex items-center gap-2 bg-white">
                      <MoreHorizontal className="w-4 h-4" />
                      Show all photos
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold mb-4">{house.title}</h1>
            <p className="text-gray-600 mb-4">{house.location}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Bedrooms</h3>
                <p>{house.bedrooms}</p>
              </div>
              <div>
                <h3 className="font-semibold">Bathrooms</h3>
                <p>{house.bathrooms}</p>
              </div>
              <div>
                <h3 className="font-semibold">Sitting Rooms</h3>
                <p>{house.sittingRooms}</p>
              </div>
              <div>
                <h3 className="font-semibold">Dining Rooms</h3>
                <p>{house.diningRooms}</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-gray-700 mb-6">{house.description}</p>
            <h2 className="text-2xl font-bold mb-2">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Interior Features</h3>
                <p>{house.interiorFeatures}</p>
              </div>
              <div>
                <h3 className="font-semibold">Exterior Features</h3>
                <p>{house.exteriorFeatures}</p>
              </div>
              <div>
                <h3 className="font-semibold">Security Features</h3>
                <p>{house.securityFeatures}</p>
              </div>
              <div>
                <h3 className="font-semibold">Living Arrangement</h3>
                <p>{house.livingArrangement}</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Electricity Type</h3>
                <p>{house.electricityType}</p>
              </div>
              <div>
                <h3 className="font-semibold">Water Supply</h3>
                <p>{house.waterSupply}</p>
              </div>
              <div>
                <h3 className="font-semibold">Floor Type</h3>
                <p>{house.floorType}</p>
              </div>
              <div>
                <h3 className="font-semibold">Ceiling Type</h3>
                <p>{house.ceilingType}</p>
              </div>
              <div>
                <h3 className="font-semibold">Roof Type</h3>
                <p>{house.roofType}</p>
              </div>
              <div>
                <h3 className="font-semibold">Fencing Type</h3>
                <p>{house.fencingType}</p>
              </div>
              <div>
                <h3 className="font-semibold">Parking</h3>
                <p>{house.hasParking ? "Available" : "Not available"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Neighbours</h3>
                <p>{house.neighbours}</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Legal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Title Deed Type</h3>
                <p>{house.titleDeedType}</p>
              </div>
              <div>
                <h3 className="font-semibold">Legal Information</h3>
                <p>{house.legalInformation}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <ReservationForm house={house} />
        </div>
      </div>
    </div>
  )
}

