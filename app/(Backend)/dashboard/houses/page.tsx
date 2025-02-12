import { fetchHouse } from '@/actions/House'
import HousesPageDashboard from '@/components/BackEndComponents/DashboardHouses/HousesPageDashboard'
import React from 'react'

export default async function page() {
  const fetchedHouse = await fetchHouse() || []
  return (
    <div>
      <HousesPageDashboard houses={fetchedHouse}/>
    </div>
  )
}
