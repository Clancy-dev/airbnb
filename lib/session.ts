import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { User, UserRole } from '@prisma/client';

export type SessionPayload={
    userId:string;
    role:UserRole;
    email:string;
    name:string;
    expiresAt:Date;
    
}


 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}


 
export async function createSession(user:User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const payLoadData = {
    userId:user.id,
    role:user.role,
    email:user.email,
    name:user.fullName,
    expiresAt:expiresAt,
}
  const session = await encrypt(payLoadData)
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}



//prevent someone logging in after use everytime, auto check and update the session time
import 'server-only'
import { cookies } from 'next/headers'

 
export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}


export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}