import 'server-only'
 
import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from './session'
import { redirect } from 'next/navigation'
import { db } from '@/prisma/db'
import { UserRole } from '@prisma/client'
import { AuthUser } from '@/components/BackEndComponents/DashBoardHeader/UserProfile'

 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { 
    isAuth: true,
    userId: session.userId,
     data:{
    id:session.userId as string,
    fullName:session.name as string,
    role:session.role as string,
    email:session.email as string,
  } }
})


export const getAuthUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
    const id = session.userId as string
   
    try {
      const user = await db.user.findUnique({
        where:{
            id

        },
        select:{
            fullName:true,
            role:true,
            email:true,
            imageUrl:true,
        },
      });
   
      return user as AuthUser;

    } catch (error) {
      console.log('Failed to fetch user')
      return null
    }
  })
