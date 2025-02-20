import { db } from "@/prisma/db";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { createSession } from "@/lib/session";
import { compareSync } from "bcrypt-ts";


export async function POST(request:NextRequest){
    try {
        const {fullName,email,password} = await request.json();
        const existingUser = await db.user.findFirst({
            where:{
                email,
            },
        })
        if(!existingUser){
            return NextResponse.json(
                {
                    data:null,
                    error: "Wrong Credentials",
                },
                {
                    status:403
                }
            )

        }
        
        let isCorrect = false
        isCorrect = compareSync(password, existingUser.password)
        if(!isCorrect){
            return NextResponse.json(
                {
                    data:null,
                    error: "Wrong Credentials",
                },
                {
                    status:403
                }
            )

        }
      
        
        // Lastly, we create the session
        await createSession(existingUser);

        const {password:returnedPassword,token,...others} = existingUser

        revalidatePath("/dashboard/users")
        return NextResponse.json(
            {
                data:others,
                error: null,
            },
            {
                status:201
            }
        )


        
    } catch (error) {
        console.log(error);
        
    }




}