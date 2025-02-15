// import { fetchOneHouse } from '@/actions/House'
import { fetchOneHouse } from '@/actions/House'
import HouseDetailedPage from '@/components/FrontEndComponents/HouseDetailedPage'
import { notFound } from 'next/navigation';
import React from 'react'



export default async function Page({
    params,
}: {
    params: Promise<{ slug: string}>
}) {
    const { slug } = await params;
    
    // Ensure slug exists before fetching
    if (!slug) return notFound(); 
    
    const fetchedOneHouse = await fetchOneHouse(slug);
    
    // Handle non-existing house
    if (!fetchedOneHouse) return notFound(); 
    
    return (
        <div>
            <HouseDetailedPage house={fetchedOneHouse} />
        </div>
    );
}
