"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"
import { Star } from "lucide-react"
// import { fetchCategory } from "@/actions/Category"
import { createHouse } from "@/actions/House"
import { UploadButton } from "@/utils/uploadthing"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { fetchCategory } from "@/actions/Category"
import { CategoryProps } from "./CategoryForm"

type Category = {
  id: string
  title: string
}

export type HouseProps = {
  title: string
  categoryTitle: string
  categoryId: string
  price: number
  slug: string
  timeline: string
  description: string
  isGuestFavorite: boolean
  rating: number
  images: string[]

}

export default function HouseForm() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [rating, setRating] = useState<number>(0)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HouseProps>({
    defaultValues: {
      isGuestFavorite: false,
      rating: 0,
      images: [],
    },
  })

  useEffect(() => {
    async function getCategories() {
      try {
        const fetchedCategories = await fetchCategory()
        setCategories(fetchedCategories as Category[])
      } catch (error) {
        console.error("Failed to fetch categories", error)
      }
    }
    getCategories()
  }, [])

  async function saveData(data: HouseProps) {
    data.slug = data.title.toLowerCase().split(" ").join("-")
    data.images = images
    data.rating = rating
    try {
      setLoading(true)
      const newHouse = await createHouse(data)
      console.log(newHouse)
      toast.success("House created successfully.")
      router.push("/dashboard/houses")
      router.refresh()
      reset()
    } catch (error) {
      toast.error("Failed to create the house.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRating = (selectedRating: number) => {
    if (rating === selectedRating) {
      setRating(0)
      setValue("rating", 0)
    } else {
      setRating(selectedRating)
      setValue("rating", selectedRating)
    }
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <Card className="max-w-2xl mx-auto border-0 shadow-2xl overflow-hidden bg-white backdrop-blur-sm">
        <div className="absolute inset-0 bg-white pointer-events-none" />

        <div className="relative">
          <div className="h-2" />

          <CardHeader className="space-y-1 pb-8 pt-6 text-center bg-gradient-to-b from-white/80 to-white/40">
            <CardTitle className="text-3xl font-bold bg-black bg-clip-text text-transparent">
              Add New House
            </CardTitle>
            <CardDescription className="text-black font-medium">
              Enter the details for the new house listing
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(saveData)} className="space-y-6">
              <div className="space-y-4">
                {/* Location Field */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-black font-semibold">
                    Location
                  </Label>
                  <Input
                    id="location"
                    {...register("title", {
                      required: "Location is required",
                    })}
                    placeholder="Enter location"
                    className="border-red-200 bg-white/70 focus:border-gray-400 focus:ring-gray-400 transition-colors placeholder:text-red-300"
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
                      <div className="scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-transparent hover:scrollbar-thumb-red-300">
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
                  <Label htmlFor="timeline" className="text-black font-semibold">
                    Timeline
                  </Label>
                  <Input
                    id="timeline"
                    {...register("timeline", {
                      required: "Timeline is required",
                    })}
                    placeholder="e.g., Available from June 2024"
                    className="border-red-200 bg-white/70 focus:border-gray-400 focus:ring-none transition-colors placeholder:text-red-300"
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
                    placeholder="Enter price per night"
                    className="border-red-200 bg-white/70 focus:border-red-400 focus:ring-red-400 transition-colors placeholder:text-red-300"
                  />
                  {errors.price && <p className="text-sm text-red-600 font-medium">{errors.price.message}</p>}
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-black font-semibold">
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

                {/* Rating Field */}
                <div className="space-y-2">
                  <Label className="text-black font-semibold">Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating ? "fill-black text-black" : "fill-gray-200 text-gray-200"
                          } hover:fill-gray-400 hover:text-gray-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <input type="hidden" {...register("rating")} value={rating} />
                </div>

                {/* Guest Favorite Field */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isGuestFavorite"
                      {...register("isGuestFavorite")}
                      className="border-black data-[state=checked]:text-black bg-white"
                    />
                    <Label htmlFor="isGuestFavorite" className="text-black font-semibold">
                      Guest Favorite
                    </Label>
                  </div>
                </div>

                {/* Multiple Images Upload Section */}
                <div className="space-y-4">
                  <Label className="text-black font-semibold">House Images</Label>
                  <div className="rounded-xl border border-black bg-white/70 shadow-sm overflow-hidden">
                    <div className="p-6 space-y-4">
                      {/* Image Preview Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                            <Image
                              src={url || "/placeholder.svg"}
                              fill
                              alt={`House preview ${index + 1}`}
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            <button
                              type="button"
                              onClick={() => setImages(images.filter((_, i) => i !== index))}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {images.length === 0 && (
                          <div className="aspect-square rounded-lg border-2 border-dashed border-red-200 flex items-center justify-center text-red-400">
                            No images yet
                          </div>
                        )}
                      </div>

                      {/* Upload Button */}
                      <div className="w-full max-w-xs mx-auto">
                        <UploadButton
                          endpoint="multipleImageUploader"
                          onClientUploadComplete={(res) => {
                            const newUrls = res.map((file) => file.url)
                            setImages([...images, ...newUrls])
                            toast.success("Images uploaded successfully!")
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

              <div className="pt-6 w-full p-1 flex items-center justify-center">
                <Button
                  type="submit"
                  className="py-2 px-3 bg-black hover:bg-gray-500 hover:text-white text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
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