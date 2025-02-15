import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type HouseGalleryProps = {
  title: string
  description: string
  slug: string
  interiorImages: string[]
  exteriorImages: string[]
}

export default function HouseGalleryPage({ house }: { house: HouseGalleryProps }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/${house.slug}`}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to house details
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{house.title}</h1>
      <p className="text-gray-600 mb-8">{house.description}</p>

      <Tabs defaultValue="interior" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="interior">Interior Images</TabsTrigger>
          <TabsTrigger value="exterior">Exterior Images</TabsTrigger>
        </TabsList>
        <TabsContent value="interior">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {house.interiorImages.map((image, index) => (
              <div key={`interior-${index}`} className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${house.title} interior ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="exterior">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {house.exteriorImages.map((image, index) => (
              <div key={`exterior-${index}`} className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${house.title} exterior ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

