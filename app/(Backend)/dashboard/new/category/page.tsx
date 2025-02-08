import CategoryForm from '@/components/Forms/CategoryForm'
import { ArrowLeft, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="p-5 w-full">
      <div className='w-[100%] h-10 flex items-center justify-end'>
      <Link href="/dashboard/categories" className='bg-white rounded-md hover:bg-gray-400 hover:text-white px-3 py-2 flex font-normal gap-1 mr-[4rem]'>
        <ChevronLeft/>
        Back
      </Link>
      </div>
      <CategoryForm/>   
    </div>
  )
}
