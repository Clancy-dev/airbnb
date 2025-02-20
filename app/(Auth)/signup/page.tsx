import SignUpForm from '@/components/Auth/SignUpForm'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className='w-full flex items-center justify-center min-h-screen '>
      <div className=' md:w-[80%] w-[95%] shadow-xl md:p-4 p-2'>
        <div className="w-full flex">
          <div className='md:w-[50%] w-[100%]'>
          <SignUpForm/>
          
          </div>
          <div className='hidden md:flex w-[50%] items-center justify-center '>
          <Image
          src="/smile.jpg"
          alt="woman"
          width={826}
          height={551}
          
          />
        </div>
        </div>
       
      </div>
    
    </div>
  )
}
