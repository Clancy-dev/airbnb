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

              <div className="w-full p-1 flex items-center justify-center">
              <Button
                  type="submit"
                  className="px-16 py-2 bg-red-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                      Signing Up...
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







// import React from 'react'

// export default function SignUpForm() {
//   return (
//     <div>
      

// <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
//     <form className="space-y-6" action="#">
//         <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create Account on Nestora</h5>
//         <div>
//             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//             <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
//         </div>
//         <div>
//             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
//             <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
//         </div>
//         <div className="flex items-start">
//             <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                     <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
//                 </div>
//                 <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
//             </div>
//             <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
//         </div>
//         <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
//         <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
//             Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
//         </div>
//     </form>
// </div>

      
//     </div>
//   )
// }
