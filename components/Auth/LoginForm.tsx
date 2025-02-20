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
import Link from "next/link";


export type loginProps = {
    fullName :string;
    email: string;
    password:string;
    phone:string;
}

export default function LoginForm() {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [loginError, setLoginError] = useState("")
 

   async function loginUser(data: loginProps) {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/login`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
      });
      console.log(response) 
      if(response.status==403){
        // 403 -> Forbidden
        setLoginError("Wrong Credentials!")
        return;
      }
      toast.success("Login successful!")
      reset()  
      router.push("/dashboard")
      router.refresh()
      
    } catch (error) {
      toast.error("Login Failed!")
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
        <h2 className='text-2xl font-semibold tracking-tight '>Login to your Nestora Account.</h2>
                <p className="text-sm text-muted-foreground">Enter your Email and Password to login.</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white bg-opacity-90 rounded-b-lg">
        <form className="space-y-6" onSubmit={handleSubmit(loginUser)}>

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
          <div className="py-2">
            {loginError&&<p className="text-red-500 text-sm">Wrong Credentials!</p>}
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
                      Logging in...
                    </div>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </div>
              <p><span className="font-medium">Not Registered,{" "}</span><Link href="/signup" className="text-red-600">Sign Up</Link></p>
        </form>
      </CardContent>
    
    </Card>
    </section>
  );
}







