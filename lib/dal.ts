import 'server-only'
 
import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from './session'
import { redirect } from 'next/navigation'
import { db } from '@/prisma/db'

 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId, data:session }
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
            id:true,
            fullName:true,
            role:true,
            email:true,
        },
      });
   
      return user

    } catch (error) {
      console.log('Failed to fetch user')
      return null
    }
  })