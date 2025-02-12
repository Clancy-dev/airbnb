
import { fetchCategory } from '@/actions/Category'
import { fetchHouse } from '@/actions/House'
import HomePage from '@/components/FrontEndComponents/HomeComponents/HomePage'


export default async function Home() {
  const fetchedCategory = await fetchCategory() || []
  console.log(fetchedCategory)
  const fetchedHouse = await fetchHouse() || []
  console.log(fetchedCategory)
  return (
    <div className="min-h-screen bg-gray-100">
      <HomePage categories={fetchedCategory} houses={fetchedHouse} />
      
    </div>
  )
}

