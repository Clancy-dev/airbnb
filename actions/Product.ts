"use server"

import { ProductProps } from "@/components/Forms/ProductForm";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createNewProduct(data:ProductProps){
  try {
    const createdNewProduct = await db.productt.create({
      data
    })
    console.log(createNewProduct)
     
    return createdNewProduct
  } catch (error) {
    console.log(error)
   return {
    error
   }
  }

}




export async function fetchProduct(){
  try {
    const fetchedProduct = await db.productt.findMany({
      orderBy:{
        createdAt:"desc"
      }
     }) 
     console.log("Fetched Products:", fetchedProduct);
    return fetchedProduct

   } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on failure
   }

}










