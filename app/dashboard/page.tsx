import { fetchCategory } from '@/actions/Category'
import DashboardPage from '@/components/DashboardPage'
import React from 'react'

export default async function page() {
  // const fetchedCategory = await fetchCategory() || []
  return (
    <div>
      <DashboardPage/>
      {/* <DashboardPage categories={fetchedCategory}/> */}
    </div>
  )
}
