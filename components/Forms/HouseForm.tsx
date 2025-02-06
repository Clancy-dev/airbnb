"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"
import { fetchCategory } from "@/actions/Category"
// import { createHouse } from "@/actions/House"
import { UploadButton } from "@/utils/uploadthing"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createHouse } from "@/actions/House"

type Category = {
  id: string
  title: string
}

export type HouseProps = {
  title: string
  categoryTitle: string
  categoryId: string
  price: number
  image: string
  slug: string
  timeline: string
  description: string
}

export default function HouseForm() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("/emptyImage.png")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<HouseProps>()

  useEffect(() => {
    async function getCategories() {
      try {
        const fetchedCategories = await fetchCategory()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Failed to fetch categories", error)
      }
    }
    getCategories()
  }, [])

  async function saveData(data: HouseProps) {
    data.slug = data.title.toLowerCase().split(" ").join("-")
    data.image = imageUrl
    try {
      setLoading(true)
      const newHouse = await createHouse(data)
      console.log(newHouse)
      toast.success("House created successfully.")
      router.push("/")
      router.refresh()
      reset()
    } catch (error) {
      toast.error("Failed to create the house.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-red-50 via-white to-red-50">
      <Card className="max-w-2xl mx-auto border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-800/10 pointer-events-none" />

        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-red-600 via-red-700 to-red-800" />

          <CardHeader className="space-y-1 pb-8 pt-6 text-center bg-gradient-to-b from-white/80 to-white/40">
            <CardTitle className="text-3xl font-bold bg-gradient-to-br from-red-700 to-red-900 bg-clip-text text-transparent">
              Add New House
            </CardTitle>
            <CardDescription className="text-red-700/70 font-medium">
              Enter the details for the new house listing
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(saveData)} className="space-y-6">
              <div className="space-y-4">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-red-800 font-semibold">
                    House Title
                  </Label>
                  <Input
                    id="title"
                    {...register("title", {
                      required: "House Title is required",
                    })}
                    placeholder="Enter house title"
                    className="border-red-200 bg-white/70 focus:border-red-400 focus:ring-red-400 transition-colors placeholder:text-red-300"
                  />
                  {errors.title && <p className="text-sm text-red-600 font-medium">{errors.title.message}</p>}
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-red-800 font-semibold">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("categoryId", value)
                      const selectedCategory = categories.find((category) => category.id === value)
                      setValue("categoryTitle", selectedCategory?.title || "")
                    }}
                  >
                    <SelectTrigger className="border-red-200 bg-white/70 focus:border-red-400 focus:ring-red-400">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px] overflow-y-auto bg-white/90 backdrop-blur-sm border-red-200">
                      <div className="max-h-[inherit] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-red-50 hover:scrollbar-thumb-red-300">
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="focus:bg-red-50 focus:text-red-900 hover:bg-red-50 cursor-pointer transition-colors"
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                  {errors.categoryId && <p className="text-sm text-red-600 font-medium">{errors.categoryId.message}</p>}
                </div>

                <input type="hidden" {...register("categoryTitle", { required: true })} />

                {/* Timeline Field */}
                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-red-800 font-semibold">
                    Timeline
                  </Label>
                  <Input
                    id="timeline"
                    {...register("timeline", {
                      required: "Timeline is required",
                    })}
                    placeholder="e.g., Available from June 2024"
                    className="border-red-200 bg-white/70 focus:border-red-400 focus:ring-red-400 transition-colors placeholder:text-red-300"
                  />
                  {errors.timeline && <p className="text-sm text-red-600 font-medium">{errors.timeline.message}</p>}
                </div>

                {/* Price Field */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-red-800 font-semibold">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      validate: (value) => value > 0 || "Price must be greater than 0",
                    })}
                    placeholder="Enter price"
                    className="border-red-200 bg-white/70 focus:border-red-400 focus:ring-red-400 transition-colors placeholder:text-red-300"
                  />
                  {errors.price && <p className="text-sm text-red-600 font-medium">{errors.price.message}</p>}
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-red-800 font-semibold">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    placeholder="Describe the house in detail..."
                    className="min-h-[150px] border-red-200 bg-white/70 focus:border-red-400 focus:ring-red-400 transition-colors placeholder:text-red-300"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 font-medium">{errors.description.message}</p>
                  )}
                </div>

                {/* Image Upload Section */}
                <div className="space-y-4">
                  <Label className="text-red-800 font-semibold">House Image</Label>
                  <div className="rounded-xl border border-red-200 bg-white/70 shadow-sm overflow-hidden">
                    <div className="p-6 flex flex-col items-center gap-4">
                      <div className="relative w-full max-w-[300px] aspect-square rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          fill
                          alt="House preview"
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="w-full max-w-xs mx-auto">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res)
                            setImageUrl(res[0].url)
                            toast.success("Image uploaded successfully!")
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`Upload failed: ${error.message}`)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg py-6"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                      Creating New House...
                    </div>
                  ) : (
                    "Create New House"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

