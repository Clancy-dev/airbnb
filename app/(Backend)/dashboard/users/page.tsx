import { verifySession } from '@/lib/dal'
import React from 'react'

export default async function page() {
  const {data} = await verifySession()
  return (
    <div>
      <h2>Dashboard users</h2>
      <h2><span className='font-bold'>Hello {data?.fullName},</span>Welcome back,here is what is happening in your store today.</h2>
      
    </div>
  )
}
