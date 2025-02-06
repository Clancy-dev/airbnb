"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import { createNewCategory } from "@/actions/Category";
import { UploadButton } from "@/utils/uploadthing";

export type CategoryProps = {
    image :string;
    title: string;
    slug: string;
}

export default function CategoryForm() {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryProps>();
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const[imageUrl,setImageUrl] = useState("/emptyImage.png")
  const router = useRouter();

  async function saveData(data: CategoryProps) {
    data.slug = data.title.toLowerCase().split(" ").join("-");
    data.image = imageUrl;
    try {
      setLoading(true)
      await createNewCategory(data) 
      toast.success("Category created successfully.")
      router.push("/")
      router.refresh()
      reset()  
    } catch (error) {
      toast.error("Failed to create the category.")
      console.log(error) 
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="p-5 mt-[72px]">
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-green-500 to-green-900 shadow-xl">
      <CardHeader className="text-white">
        <CardTitle className="text-2xl font-bold text-center mb-2">New Category</CardTitle>
      </CardHeader>
      <CardContent className="bg-white bg-opacity-90 rounded-b-lg">
        <form className="space-y-6" onSubmit={handleSubmit(saveData)}>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">Category Title</Label>
            <Input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter Category title"
              className="bg-white"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          
          {/* imagepart */}

          <div className="space-y-2 ">
          <Label htmlFor="title" className="text-gray-700">Category Image</Label>
          <div className="w-full min-h-[40vh]  bg-slate-300 rounded-[10px]">
            <div className="w-full h-[30vh] flex items-center justify-center ">
              <Image
              src={imageUrl}
              width={512}
              height={512}
              alt="Image name"
              className="max-h-[100%] max-w-[40%]"
              
              />

            </div>
            <div className="w-full min h-[15vh] flex items-center justify-center ">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
          // Do something with the response
             console.log("Files: ", res);
             setImageUrl(res[0].url)
            //  alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

            </div>

          </div>

          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-[10px]"
          >
            {loading ? "Creating New Category..." : "Create New Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
    </section>
  );
}


