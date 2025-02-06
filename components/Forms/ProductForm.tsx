"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchCategory } from "@/actions/Category"; // Import the fetchCategory function
import Image from "next/image"; // Import Image component
import { UploadButton } from "@/utils/uploadthing";
import { createNewProduct } from "@/actions/House";
import { revalidatePath } from "next/cache";

type Category = {
  id: string;
  title: string;
};

export type ProductProps = {
  title: string;
  categoryTitle: string;
  categoryId: string;
  price: number;
  image: string;
  slug: string;
};

export default function ProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/emptyImage.png");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductProps>();

  // Fetch categories when component mounts
  useEffect(() => {
    async function getCategories() {
      try {
        const fetchedCategories = await fetchCategory(); // Fetch categories from server
        setCategories(fetchedCategories); // Store categories in state
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    getCategories();
  }, []);

  async function saveData(data: ProductProps) {
    data.slug = data.title.toLowerCase().split(" ").join("-");
    data.image = imageUrl; // Store the image URL
    try {
      setLoading(true);
      // Call your server action to save the product
      const newPrdt = await createNewProduct(data);
      console.log(newPrdt);
      toast.success("Product created successfully.");
      router.push("/");
      router.refresh();
      reset();
    } catch (error) {
      toast.error("Failed to create the product.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-[10vh] flex items-center justify-center p-2 logo-font">
      <form
        onSubmit={handleSubmit(saveData)}
        className="bg-white shadow-md rounded-[10px] px-8 pt-6 pb-8 mb-4 lg:w-[50%] md:w-[80%] sm:w-[100%]"
      >
        <div className="w-full flex items-center justify-center rounded text-white bg-gradient-to-br from-green-500 to-green-900 h-[10vh] mb-3">
          <h2 className="text-2xl font-bold text-center mb-2">New Product</h2>
        </div>

        {/* Product Title */}
        <div className="mb-4">
          <label className="block text-green-900 text-md font-bold mb-2" htmlFor="title">
            Product Title
          </label>
          <input
            {...register("title", { required: "Product Title is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-green-900 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Category Select */}
        <div className="mb-4">
          <label className="block text-green-900 text-md font-bold mb-2" htmlFor="category">
            Under What Category?
          </label>
          <select
            {...register("categoryId", { required: "Category is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-green-900 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            onChange={(e) => {
              const selectedCategory = categories.find(
                (category) => category.id === e.target.value
              );
              setValue("categoryTitle", selectedCategory?.title || ""); // Set category title dynamically
            }}
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))
            ) : (
              <option value="">No categories available</option>
            )}
          </select>
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
        </div>

        {/* Hidden Input for Category Title */}
        <input
          type="hidden"
          {...register("categoryTitle", { required: true })}
        />

        {/* Price */}
        <div className="mb-4">
          <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Price must be greater than 0",
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-green-900">
            Product Image
          </label>
          <div className="w-full min-h-[40vh] rounded-[10px]">
            <div className="w-full flex items-center justify-center">
              <Image
                src={imageUrl}
                width={512}
                height={512}
                alt="Image preview"
                className="lg:min-h-[100%] lg:max-w-[40%] md:min-h-[80%] md:max-w-[60%] sm:min-h-[60%] sm:max-w-[100%]"
              />
            </div>
            <div className="w-full min-h-[15vh] flex items-center justify-center">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  setImageUrl(res[0].url); // Set the uploaded image URL
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-[10px]"
        >
          {loading ? "Creating New Product..." : "Create New Product"}
        </Button>
      </form>
    </div>
  );
}
