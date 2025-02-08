import { fetchCategory } from '@/actions/Category'
import { fetchHouse } from '@/actions/House'
import CategoriesPageDashboard from '@/components/CategoriesPageDashboard'
import CategoriesPage from '@/components/CategoriesPageDashboard'
import React from 'react'

export default async function page() {
  const fetchedCategory = await fetchCategory() || []
  const fetchedHouse = await fetchHouse() || []
  return (
    <div>
      <CategoriesPageDashboard categories={fetchedCategory} houses={fetchedHouse} />
    </div>
  )
}
