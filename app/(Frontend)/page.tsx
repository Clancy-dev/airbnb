
import { fetchCategory } from '@/actions/Category'
import { fetchHouse } from '@/actions/House'
import HomePage from '@/components/FrontEndComponents/HomeComponents/HomePage'


export default async function Home() {
  const fetchedCategory = await fetchCategory() || []
  console.log(fetchedCategory)
  const fetchedHouse = await fetchHouse() || []
  console.log(fetchedCategory)
  return (
    <div className="min-h-screen bg-white lg:p-4 md:p-2 sm:p-2 p-1">
      <HomePage categories={fetchedCategory} houses={fetchedHouse} />
      
    </div>
  )
}

