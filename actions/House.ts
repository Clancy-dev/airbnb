"use server"


import { HouseProps } from "@/components/Forms/HouseForm";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";


export async function createHouse(data:HouseProps){
  try {
    const createdHouse = await db.house.create({
      data
    })
    revalidatePath("/dashboard/houses")
    console.log(createdHouse)
     
    return createdHouse
  } catch (error) {
    console.log(error)
   return {
    error
   }
  }

}




export async function fetchHouse(){
  try {
    const fetchedHouse = await db.house.findMany({
      orderBy:{
        createdAt:"desc"
      }
     }) 
     console.log("Fetched House:", fetchedHouse);
    return fetchedHouse

   } catch (error) {
    console.error("Error fetching houses:", error);
    return []; // Return empty array on failure
   }

}










