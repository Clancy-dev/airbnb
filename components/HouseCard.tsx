import Image from "next/image"

interface House {
  id: number
  image: string
  city: string
  description: string
  price: number
  time: string
}

interface HouseCardProps {
  house: House
}

export default function HouseCard({ house }: HouseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={house.image || "/placeholder.svg"}
        alt={house.description}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{house.city}</h2>
        <p className="text-gray-600 mb-4">{house.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${house.price}</span>
          <span className="text-gray-500">per {house.time}</span>
        </div>
      </div>
    </div>
  )
}

