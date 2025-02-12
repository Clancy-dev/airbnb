"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Home, Grid, DollarSign } from "lucide-react"

interface House {
  id: number
  title: string
  categoryId: number
  price: number
}

interface Category {
  id: number
  title: string
}

interface CategoryData {
  name: string
  total: number
}

// This would typically come from your API or database
const fetchData = async (): Promise<{ houses: House[]; categories: Category[] }> => {
  // Simulated API call
  return {
    houses: [
      { id: 1, title: "Cozy Apartment", categoryId: 1, price: 150 },
      { id: 2, title: "Luxury Villa", categoryId: 2, price: 500 },
      { id: 3, title: "Rustic Cabin", categoryId: 3, price: 200 },
      { id: 4, title: "Beachfront Condo", categoryId: 1, price: 300 },
      { id: 5, title: "City Loft", categoryId: 2, price: 180 },
    ],
    categories: [
      { id: 1, title: "Apartments" },
      { id: 2, title: "Villas" },
      { id: 3, title: "Cabins" },
    ],
  }
}

export default function DashboardPage() {
  const [houses, setHouses] = useState<House[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchData().then((data) => {
      setHouses(data.houses)
      setCategories(data.categories)
    })
  }, [])

  const totalHouses = houses.length
  const totalCategories = categories.length
  const totalPrice = houses.reduce((sum, house) => sum + house.price, 0)

  const categoryData: CategoryData[] = categories.map((category) => ({
    name: category.title,
    total: houses.filter((house) => house.categoryId === category.id).length,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-muted-foreground">{`Total Houses: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Houses</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHouses}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ugshs {totalPrice.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Houses per Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full overflow-x-auto">
            <div className="min-w-[400px] h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#888888" }}
                    tickLine={{ stroke: "#888888" }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fill: "#888888" }} tickLine={{ stroke: "#888888" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

