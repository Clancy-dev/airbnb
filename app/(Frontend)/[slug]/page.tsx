// import { fetchOneHouse } from '@/actions/House'
import { fetchOneHouse } from '@/actions/House'
import HouseDetailedPage from '@/components/FrontEndComponents/HouseDetailedPage'
import { notFound } from 'next/navigation';
import React from 'react'

type PageProps = {
    params: {
      slug: string
    }
  }

export default async function page({ params }: PageProps) {
    const { slug } = params;
     // Ensure slug exists before fetching
     if (!slug) return notFound(); 
    const fetchedOneHouse = await fetchOneHouse(slug)
     if (!fetchedOneHouse) return notFound(); // Handle non-existing house
  return (
    <div>
        <HouseDetailedPage house={fetchedOneHouse}/>
      
    </div>
  )
}
