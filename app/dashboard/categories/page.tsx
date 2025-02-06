import { fetchCategory } from '@/actions/Category'
import CategoriesPageDashboard from '@/components/CategoriesPageDashboard'
import CategoriesPage from '@/components/CategoriesPageDashboard'
import React from 'react'

export default async function page() {
  const fetchedCategory = await fetchCategory() || []
  return (
    <div>
      <CategoriesPageDashboard categories={fetchedCategory}/>
    </div>
  )
}
