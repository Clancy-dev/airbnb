import { fetchCategory } from '@/actions/Category'
import { fetchHouse } from '@/actions/House'
import DashboardPage from '@/components/DashboardPage'
import React from 'react'

export default async function page() {
  const fetchedCategory = await fetchCategory() || []
  const fetchedHouse = await fetchHouse() || []
  return (
    <div>
       <DashboardPage categories={fetchedCategory} houses={fetchedHouse} />
    </div>
  )
}
