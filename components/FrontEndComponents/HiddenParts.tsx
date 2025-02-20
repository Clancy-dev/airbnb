import React from 'react'

export default function HiddenParts({userId}:{userId:string|null}) {
  return (
    <div className='flex h-screen w-full gap-2 p-2'>
        <p>Action 1 and Action 2 will only be displayed when there is a verified user or when the user is logged in.</p>
        {
            userId && (
              <div className='w-12 h-12 text-white bg-green-800'>
                Action 1
              </div>
              )
        }

       {
            userId && (
              <div className='w-12 h-12 text-white bg-green-800'>
                Action 2
              </div>
              )
        }
      
      
      <div className='w-12 h-12 text-white bg-green-800'>
        Action 3
      </div>
      <div className='w-12 h-12 text-white bg-green-800'>
        Action 4
      </div>
    </div>
  )
}
