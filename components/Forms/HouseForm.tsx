"use client"

import { useState, useEffect } from "react"
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
  type FieldErrors,
  type UseFormWatch,
  type UseFormSetValue,
} from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { UploadButton } from "@/utils/uploadthing"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { fetchCategory } from "@/actions/Category"
import { createHouse } from "@/actions/House"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"

const steps = ["Basic Details", "House Features", "Interior", "Exterior", "Legal", "Images", "Preview & Submit"]

type Category = {
  id: string
  title: string
  image:string
}

export type HouseProps = {
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

export default function HouseForm() {
  const [step, setStep] = useState(0)
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HouseProps>({
    defaultValues: {
      title: "",
      price: 0,
      location: "",
      description: "",
      categoryId: "",
      categoryTitle: "",
      availableFrom: "",
      availableTo: "",
      bedrooms: "",
      bathrooms: "",
      sittingRooms: "",
      diningRooms: "",
      kitchens: "",
      hasParking: true,
      electricityType: "",
      waterSupply: "",
      floorType: "",
      ceilingType: "",
      interiorFeatures: "",
      livingArrangement: "",
      roofType: "",
      fencingType: "",
      exteriorFeatures: "",
      securityFeatures: "",
      neighbours: "",
      titleDeedType: "",
      legalInformation: "",
      interiorImages: [
        "/emptyImagee.png",
        "/emptyImagee.png",
        "/emptyImagee.png",
        "/emptyImagee.png",
        "/emptyImagee.png",
      ],
      exteriorImages: [
        "/emptyImagee.png",
        "/emptyImagee.png",
        "/emptyImagee.png",
        "/emptyImagee.png",
        "/emptyImagee.png",
      ],
      rating: 0,
    },
  })

  useEffect(() => {
    async function getCategories() {
      const categories = await fetchCategory()
      setFetchedCategories(categories)
    }
    getCategories()
  }, [])

  const onSubmit: SubmitHandler<HouseProps> = async (data) => {
    setLoading(true)
    data.slug = data.title.toLowerCase().split(" ").join("-")
    try {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Tabs value={step.toString()} className="w-full">
        <TabsList className="grid w-full grid-cols-7 gap-1 mb-8">
          {steps.map((label, index) => (
            <TabsTrigger
              key={label}
              value={index.toString()}
              onClick={() => setStep(index)}
              disabled={index > step}
              className={cn(
                "data-[state=active]:bg-black data-[state=active]:text-white",
                index <= step ? "bg-gray-200" : "bg-gray-100",
                "px-2 py-1 text-sm md:text-base",
              )}
            >
              <span className="md:hidden">{index + 1}</span>
              <span className="hidden md:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {step === 0 && (
            <BasicDetails
              register={register}
              errors={errors}
              fetchedCategories={fetchedCategories}
              watch={watch}
              setValue={setValue}
            />
          )}
          {step === 1 && <HouseFeatures register={register} errors={errors} watch={watch} setValue={setValue} />}
          {step === 2 && <InteriorFeatures register={register} errors={errors} watch={watch} setValue={setValue} />}
          {step === 3 && <ExteriorFeatures register={register} errors={errors} watch={watch} setValue={setValue} />}
          {step === 4 && <LegalInformation register={register} errors={errors} watch={watch} setValue={setValue} />}
          {step === 5 && <UploadImages watch={watch} setValue={setValue} />}
          {step === 6 && <PreviewSubmit watch={watch} fetchedCategories={fetchedCategories} loading={loading} />}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          className="bg-black text-white"
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          type="button"
          className="bg-black text-white"
          onClick={() => setStep((prev) => Math.min(steps.length - 1, prev + 1))}
          disabled={step === steps.length - 1}
        >
          {step === steps.length - 2 ? "Preview" : "Next"}
        </Button>
      </div>
    </form>
  )
}

type BasicDetailsProps = {
  register: UseFormRegister<HouseProps>
  errors: FieldErrors<HouseProps>
  fetchedCategories: Category[]
  watch: UseFormWatch<HouseProps>
  setValue: UseFormSetValue<HouseProps>
}

function BasicDetails({ register, errors, fetchedCategories, watch, setValue }: BasicDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Basic Details</h2>
      <div>
        <Label htmlFor="title">House Title</Label>
        <Input id="title" {...register("title", { required: "Title is required" })} className="mt-1" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="price">Price (UGX)</Label>
        <Input
          id="price"
          type="number"
          {...register("price", { required: "Price is required", valueAsNumber: true })}
          className="mt-1"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register("location", { required: "Location is required" })} className="mt-1" />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="mt-1"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="category">House Category</Label>
        <Select
          value={watch("categoryId")}
          onValueChange={(value) => {
            const selectedCategory = fetchedCategories.find((cat) => cat.id === value)
            setValue("categoryId", value)
            setValue("categoryTitle", selectedCategory?.title || "")
          }}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select House Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {fetchedCategories.length > 0 ? (
              fetchedCategories.map((category: Category) => (
                <SelectItem key={category.id} value={category.id || `category-${category.title}`}>
                  {category.title}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-categories" disabled>
                No categories available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
      </div>
      <div>
        <Label htmlFor="availableFrom">Available From</Label>
        <Input
          id="availableFrom"
          type="date"
          {...register("availableFrom", { required: "Start date is required" })}
          className="mt-1"
        />
        {errors.availableFrom && <p className="text-red-500 text-sm mt-1">{errors.availableFrom.message}</p>}
      </div>
      <div>
        <Label htmlFor="availableTo">Available To</Label>
        <Input
          id="availableTo"
          type="date"
          {...register("availableTo", { required: "End date is required" })}
          className="mt-1"
        />
        {errors.availableTo && <p className="text-red-500 text-sm mt-1">{errors.availableTo.message}</p>}
      </div>
    </div>
  )
}

type HouseFeaturesProps = {
  register: UseFormRegister<HouseProps>
  errors: FieldErrors<HouseProps>
  watch: UseFormWatch<HouseProps>
  setValue: UseFormSetValue<HouseProps>
}

function HouseFeatures({ register, errors, watch, setValue }: HouseFeaturesProps) {
  const rating = watch("rating")

  const handleRating = (value: number) => {
    if (rating === value) {
      setValue("rating", 0)
    } else {
      setValue("rating", value)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">House Features</h2>
      <div>
        <Label htmlFor="bedrooms">Number of Bedrooms</Label>
        <Input
          id="bedrooms"
          type="number"
          {...register("bedrooms", { required: "Number of bedrooms is required" })}
          className="mt-1"
        />
        {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms.message}</p>}
      </div>
      <div>
        <Label htmlFor="bathrooms">Number of Bathrooms</Label>
        <Input
          id="bathrooms"
          type="number"
          {...register("bathrooms", { required: "Number of bathrooms is required" })}
          className="mt-1"
        />
        {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms.message}</p>}
      </div>
      <div>
        <Label htmlFor="sittingRooms">Number of Sitting Rooms</Label>
        <Input
          id="sittingRooms"
          type="number"
          {...register("sittingRooms", { required: "Number of sitting rooms is required" })}
          className="mt-1"
        />
        {errors.sittingRooms && <p className="text-red-500 text-sm mt-1">{errors.sittingRooms.message}</p>}
      </div>
      <div>
        <Label htmlFor="diningRooms">Number of Dining Rooms</Label>
        <Input
          id="diningRooms"
          type="number"
          {...register("diningRooms", { required: "Number of dining rooms is required" })}
          className="mt-1"
        />
        {errors.diningRooms && <p className="text-red-500 text-sm mt-1">{errors.diningRooms.message}</p>}
      </div>
      <div>
        <Label htmlFor="kitchens">Number of Kitchens</Label>
        <Input
          id="kitchens"
          type="number"
          {...register("kitchens", { required: "Number of kitchens is required" })}
          className="mt-1"
        />
        {errors.kitchens && <p className="text-red-500 text-sm mt-1">{errors.kitchens.message}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="hasParking" {...register("hasParking")} />
        <Label htmlFor="hasParking">Parking Available</Label>
      </div>
      <div>
        <Label htmlFor="electricityType">Electricity Type</Label>
        <Select value={watch("electricityType")} onValueChange={(value) => setValue("electricityType", value)}>
          <SelectTrigger className="mt-1 border-gray-500">
            <SelectValue placeholder="Select Electricity Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Grid Connection">Grid Connection</SelectItem>
            <SelectItem value="Solar Power">Solar Power</SelectItem>
            <SelectItem value="No Electricity Available">No Electricity Available</SelectItem>
          </SelectContent>
        </Select>
        {errors.electricityType && <p className="text-red-500 text-sm mt-1">{errors.electricityType.message}</p>}
      </div>
      <div>
        <Label htmlFor="waterSupply">Water Supply</Label>
        <Select value={watch("waterSupply")} onValueChange={(value) => setValue("waterSupply", value)}>
          <SelectTrigger className="mt-1 border-gray-500">
            <SelectValue placeholder="Select Water Supply" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Municipal Water">Municipal Water</SelectItem>
            <SelectItem value="Borehole">Borehole</SelectItem>
            <SelectItem value="Rainwater Harvesting/Tank">Rainwater Harvesting/Tank</SelectItem>
          </SelectContent>
        </Select>
        {errors.waterSupply && <p className="text-red-500 text-sm mt-1">{errors.waterSupply.message}</p>}
      </div>
      <div>
        <Label htmlFor="rating">House Rating</Label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-6 h-6 cursor-pointer ${
                rating && value <= rating ? "fill-black text-black" : "text-gray-300"
              }`}
              onClick={() => handleRating(value)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

type InteriorFeaturesProps = {
  register: UseFormRegister<HouseProps>
  errors: FieldErrors<HouseProps>
  watch: UseFormWatch<HouseProps>
  setValue: UseFormSetValue<HouseProps>
}

function InteriorFeatures({ register, errors, watch, setValue }: InteriorFeaturesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Interior Features</h2>
      <div>
        <Label htmlFor="floorType">Floor Type</Label>
        <Input
          id="floorType"
          {...register("floorType", { required: "Floor type is required" })}
          placeholder="e.g., Tiles, Wood, Carpet"
          className="mt-1"
        />
        {errors.floorType && <p className="text-red-500 text-sm mt-1">{errors.floorType.message}</p>}
      </div>
      <div>
        <Label htmlFor="ceilingType">Ceiling Type</Label>
        <Input
          id="ceilingType"
          {...register("ceilingType", { required: "Ceiling type is required" })}
          placeholder="e.g., POP, Gypsum, Wooden"
          className="mt-1"
        />
        {errors.ceilingType && <p className="text-red-500 text-sm mt-1">{errors.ceilingType.message}</p>}
      </div>
      <div>
        <Label htmlFor="interiorFeatures">Additional Interior Features</Label>
        <Textarea id="interiorFeatures" {...register("interiorFeatures")} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="livingArrangement">Living Arrangement</Label>
        <Select value={watch("livingArrangement")} onValueChange={(value) => setValue("livingArrangement", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Living Arrangement" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="shared">Shared</SelectItem>
          </SelectContent>
        </Select>
        {errors.livingArrangement && <p className="text-red-500 text-sm mt-1">{errors.livingArrangement.message}</p>}
      </div>
    </div>
  )
}

type ExteriorFeaturesProps = {
  register: UseFormRegister<HouseProps>
  errors: FieldErrors<HouseProps>
  watch: UseFormWatch<HouseProps>
  setValue: UseFormSetValue<HouseProps>
}

function ExteriorFeatures({ register, errors, watch, setValue }: ExteriorFeaturesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Exterior Features</h2>
      <div>
        <Label htmlFor="roofType">Roof Type</Label>
        <Input
          id="roofType"
          {...register("roofType", { required: "Roof type is required" })}
          placeholder="e.g., Iron Sheets, Tiles"
          className="mt-1"
        />
        {errors.roofType && <p className="text-red-500 text-sm mt-1">{errors.roofType.message}</p>}
      </div>
      <div>
        <Label htmlFor="fencingType">Fencing Type</Label>
        <Input
          id="fencingType"
          {...register("fencingType", { required: "Fencing type is required" })}
          placeholder="e.g., Brick Wall, Hedge, None"
          className="mt-1"
        />
        {errors.fencingType && <p className="text-red-500 text-sm mt-1">{errors.fencingType.message}</p>}
      </div>
      <div>
        <Label htmlFor="exteriorFeatures">Additional Exterior Features</Label>
        <Textarea id="exteriorFeatures" {...register("exteriorFeatures")} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="securityFeatures">Security Features</Label>
        <Select value={watch("securityFeatures")} onValueChange={(value) => setValue("securityFeatures", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Security Features" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="dogs">Dogs</SelectItem>
            <SelectItem value="guards">Security Guards</SelectItem>
            <SelectItem value="dogs and guards">Both Dogs & Security Guards</SelectItem>
            <SelectItem value="self secured">Self-Secured</SelectItem>
          </SelectContent>
        </Select>
        {errors.securityFeatures && <p className="text-red-500 text-sm mt-1">{errors.securityFeatures.message}</p>}
      </div>
      <div>
        <Label htmlFor="neighbours">Number of neighbours</Label>
        <Select value={watch("neighbours")} onValueChange={(value) => setValue("neighbours", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Number of neighbours" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="many">Many</SelectItem>
          </SelectContent>
        </Select>
        {errors.neighbours && <p className="text-red-500 text-sm mt-1">{errors.neighbours.message}</p>}
      </div>
    </div>
  )
}

type LegalInformationProps = {
  register: UseFormRegister<HouseProps>
  errors: FieldErrors<HouseProps>
  watch: UseFormWatch<HouseProps>
  setValue: UseFormSetValue<HouseProps>
}

function LegalInformation({ register, errors, watch, setValue }: LegalInformationProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Legal Information</h2>
      <div>
        <Label htmlFor="titleDeedType">Title Deed Type</Label>
        <Select value={watch("titleDeedType")} onValueChange={(value) => setValue("titleDeedType", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select Title Deed Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="private">Private Milo</SelectItem>
            <SelectItem value="leasehold">Leasehold</SelectItem>
            <SelectItem value="freehold">Freehold</SelectItem>
          </SelectContent>
        </Select>
        {errors.titleDeedType && <p className="text-red-500 text-sm mt-1">{errors.titleDeedType.message}</p>}
      </div>
      <div>
        <Label htmlFor="legalInformation">Additional Legal Information</Label>
        <Textarea id="legalInformation" {...register("legalInformation")} className="mt-1" />
      </div>
    </div>
  )
}

type UploadImagesProps = {
  watch: UseFormWatch<HouseProps>
  setValue: UseFormSetValue<HouseProps>
}

function UploadImages({ watch, setValue }: UploadImagesProps) {
  const interiorImages = watch("interiorImages")
  const exteriorImages = watch("exteriorImages")

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Upload House Images</h2>

      <MultipleImageInput
        title="Interior Images"
        imageUrls={interiorImages}
        setImageUrls={(urls) => setValue("interiorImages", urls)}
        endpoint="multipleImageUploader"
      />
 
      <MultipleImageInput
        title="Exterior Images"
        imageUrls={exteriorImages}
        setImageUrls={(urls) => setValue("exteriorImages", urls)}
        endpoint="multipleImageUploader"
      />
    </div>
  )
}

type ImageInputProps = {
  title: string
  imageUrls: string[]
  setImageUrls: (urls: string[]) => void
  endpoint: any
}

function MultipleImageInput({ title, imageUrls, setImageUrls, endpoint }: ImageInputProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt={title}
            className="h-40 w-full rounded-md object-cover"
            height="300"
            src={imageUrls[0] || "/placeholder.svg"}
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((imageUrl: string, i: number) => {
              return (
                <div key={i}>
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src={imageUrl || "/placeholder.svg"}
                    width="84"
                  />
                </div>
              )
            })}
          </div>
          <UploadButton
            className="col-span-full"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              setImageUrls(res.map((item) => item.url))
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

type PreviewSubmitProps = {
  watch: UseFormWatch<HouseProps>
  fetchedCategories: Category[]
  loading: boolean
}

function PreviewSubmit({ watch, fetchedCategories, loading }: PreviewSubmitProps) {
  const values = watch()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Preview & Create</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
        <p>
          <strong>Title:</strong> {values.title}
        </p>
        <p>
          <strong>Price:</strong> UGX {values.price}
        </p>
        <p>
          <strong>Location:</strong> {values.location}
        </p>
        <p>
          <strong>Description:</strong> {values.description}
        </p>
        <p>
          <strong>Category:</strong> {values.categoryTitle || "Not specified"}
        </p>
        <p>
          <strong>Available From:</strong> {values.availableFrom}
        </p>
        <p>
          <strong>Available To:</strong> {values.availableTo}
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">House Features</h3>
        <p>
          <strong>Bedrooms:</strong> {values.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {values.bathrooms}
        </p>
        <p>
          <strong>Sitting Rooms:</strong> {values.sittingRooms}
        </p>
        <p>
          <strong>Dining Rooms:</strong> {values.diningRooms}
        </p>
        <p>
          <strong>Kitchens:</strong> {values.kitchens}
        </p>
        <p>
          <strong>Parking Available:</strong> {values.hasParking ? "No" : "Yes"}
        </p>
        <p>
          <strong>Electricity Type:</strong> {values.electricityType}
        </p>
        <p>
          <strong>Water Supply:</strong> {values.waterSupply}
        </p>
        <p>
          <strong>Rating:</strong> {values.rating ? `${values.rating} star(s)` : "Not rated"}
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Interior Features</h3>
        <p>
          <strong>Floor Type:</strong> {values.floorType}
        </p>
        <p>
          <strong>Ceiling Type:</strong> {values.ceilingType}
        </p>
        <p>
          <strong>Additional Features:</strong> {values.interiorFeatures}
        </p>
        <p>
          <strong>Living Arrangement:</strong> {values.livingArrangement}
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Exterior Features</h3>
        <p>
          <strong>Roof Type:</strong> {values.roofType}
        </p>
        <p>
          <strong>Fencing Type:</strong> {values.fencingType}
        </p>
        <p>
          <strong>Additional Features:</strong> {values.exteriorFeatures}
        </p>
        <p>
          <strong>Security Features:</strong> {values.securityFeatures}
        </p>
        <p>
          <strong>Number of neighbours:</strong> {values.neighbours}
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Legal Information</h3>
        <p>
          <strong>Title Deed Type:</strong> {values.titleDeedType}
        </p>
        <p>
          <strong>Additional Information:</strong> {values.legalInformation}
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Images</h3>
        <div>
          <h4 className="font-medium">Interior Images</h4>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {values.interiorImages.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Interior ${index + 1}`}
                className="w-full h-20 object-contain rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium">Exterior Images</h4>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {values.exteriorImages.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`Exterior ${index + 1}`}
                className="w-full h-20 object-contain rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full mt-4 py-2 px-3 bg-black hover:bg-gray-500 hover:text-white text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
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
  )
}

