
import Categories from '@/components/Categories'
import HomePage from '@/components/HomePage'
import { fetchCategory } from '@/actions/Category'

export default async function Home() {
  const fetchedCategory = await fetchCategory() || []
  return (
    <div className="min-h-screen bg-gray-100">
      <HomePage categories={fetchedCategory}/>
    </div>
  )
}

