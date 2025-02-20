import HiddenParts from '@/components/FrontEndComponents/HiddenParts'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

import React from 'react'

export default async function page() {

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie)
  const userId = session?.userId as string | null
  return (
    <div>
    <HiddenParts userId={userId}/>
    </div>
  )
}
