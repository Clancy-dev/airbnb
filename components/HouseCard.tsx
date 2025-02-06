import Image from "next/image"

interface House {
  id: string
  image: string
  title:string
  timeline:string
  description: string
  price: number
}

// interface HouseCardProps {
//   house: House
// }

export default function HouseCard({ house }:{house:House}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={house.image || "/placeholder.svg"}
        alt={house.id}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{house.title}</h2>
        <p className="text-gray-600 mb-4">{house.description}</p>
        <span className="text-gray-500">per {house.timeline}</span>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold flex">Ugh{house.price}<h2 className="font-thin">night</h2></span>
          
        </div>
      </div>
    </div>
  )
}

