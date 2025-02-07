"use server"


import { CategoryProps } from "@/components/Forms/CategoryForm";
import { db } from "@/prisma/db";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createNewCategory(data:CategoryProps){
 try {
  const createdNewCategory = await db.category.create({
    data
  })
 revalidatePath("/")

  return createdNewCategory
  
 } catch (error) {
  console.log(error)
 }
}


export async function fetchCategory(): Promise<Category[]> {
  try {
    const fetchedCategory = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return fetchedCategory;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
    
  }
}