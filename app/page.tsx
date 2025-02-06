
import Categories from '@/components/Categories'
import HomePage from '@/components/HomePage'
import { fetchCategory } from '@/actions/Category'
import { fetchHouse } from '@/actions/House'

export default async function Home() {
  const fetchedCategory = await fetchCategory() || []
  const fetchedHouse = await fetchHouse() || []
  return (
    <div className="min-h-screen bg-gray-100">
      <HomePage categories={fetchedCategory} houses={fetchedHouse} />
      
    </div>
  )
}

