import { db } from "@/prisma/db";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request:NextRequest){
    try {
        const {fullName,email,password} = await request.json();
        const existingUser = await db.user.findFirst({
            where:{
                email,
            },
        })
        if(existingUser){
            return NextResponse.json(
                {
                    data:null,
                    error: "Email Already Exists",
                },
                {
                    status:409
                }
            )

        }
        //After the above step, if a user passes it, that means he is rejestered.
        //Next step we proceed to hash(#) the password (use bcrypt) "pnpm i bcrypt" also with its types " pnpm i @types/bcrypt"
        //10 number of rounds you want to harsh the password
         const hashedPassword = await bcrypt.hash(password, 10);
            // Store hash in your password DB.

        //After the hashed password, we go ahead to create the data object
        const data = {
            fullName,
            email,
            password:hashedPassword,
        }

        //Save newUser to db
        const newUser = await db.user.create({
            data,        
        })
        console.log(newUser)
        // Lastly, we create the session
        revalidatePath("/dashboard/users")
        return NextResponse.json(
            {
                data:newUser,
                error: null,
            },
            {
                status:201
            }
        )


        
    } catch (error) {
        
    }




}