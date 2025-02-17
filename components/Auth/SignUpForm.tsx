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
// import { createNewSignUp } from "@/actions/SignUp";
import { UploadButton } from "@/utils/uploadthing";


export type SignUpProps = {
    fullName :string;
    email: string;
    password:string;
    phone:string;
}

export default function SignUpForm() {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpProps>();
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [signUpError, setSignUpError] = useState("")
 

   async function saveData(data: SignUpProps) {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/users`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
      });
      console.log(response) 
      if(response.status==409){
        setSignUpError("Email is already in Use!")
        return;
      }
      toast.success("Account has been created Successfully!")
      // router.push("/dashboard/categories")
      // router.refresh()
      // reset()  
    } catch (error) {
      toast.error("Failed to create account!")
      console.log(error) 
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <Card className="w-full max-w-2xl mx-auto bg-white border-none shadow-none">
      <CardHeader className="text-white">
        <CardTitle className=" mb-2 text-black">
        <h2 className='text-2xl font-semibold tracking-tight '>Create Account on Nestora.</h2>
                <p className="text-sm text-muted-foreground">Fill in the Form to create your account.</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white bg-opacity-90 rounded-b-lg">
        <form className="space-y-6" onSubmit={handleSubmit(saveData)}>
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-black font-semibold">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              {...register("fullName", { required: "Full Name is required" })}
              placeholder="Enter your Full Name"
              className="bg-white text-black"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-black font-semibold">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Email"
              className="bg-white text-black"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-black font-semibold">Password</Label>
            <Input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter Password"
              className="bg-white text-black"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Universal Error but for the Email. To prohibit the user from finding out that it is only the email wrong. */}
          <div className="py-2">
            {signUpError&&<p className="text-red-500 text-sm">We couldn't verify your credentials. Please re-check your credentials and try again.</p>}
          </div>
          

              <div className="w-full p-1 flex items-center justify-center">
              <Button
                  type="submit"
                  className="px-16 py-2 bg-red-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
        </form>
      </CardContent>
    </Card>
    </section>
  );
}







