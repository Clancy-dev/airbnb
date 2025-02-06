"use client"

import { useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Users, DollarSign, TrendingUp } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const categories = [
  { id: 1, name: "Rooms", totalHouses: 10, reservedHouses: 5, revenue: 5000 },
  { id: 2, name: "Icons", totalHouses: 8, reservedHouses: 3, revenue: 3000 },
  { id: 3, name: "Bed and Breakfast", totalHouses: 12, reservedHouses: 7, revenue: 7000 },
  { id: 4, name: "Amazing Pools", totalHouses: 15, reservedHouses: 10, revenue: 10000 },
  { id: 5, name: "Cabins", totalHouses: 6, reservedHouses: 4, revenue: 4000 },
  { id: 6, name: "Earth Homes", totalHouses: 4, reservedHouses: 2, revenue: 2000 },
  { id: 7, name: "Farms", totalHouses: 7, reservedHouses: 3, revenue: 3000 },
  { id: 8, name: "Countryside", totalHouses: 9, reservedHouses: 6, revenue: 6000 },
  { id: 9, name: "Mansions", totalHouses: 5, reservedHouses: 2, revenue: 5000 },
]

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const totalCategories = categories.length
  const totalHouses = categories.reduce((sum, category) => sum + category.totalHouses, 0)
  const totalReservedHouses = categories.reduce((sum, category) => sum + category.reservedHouses, 0)
  const totalRevenue = categories.reduce((sum, category) => sum + category.revenue, 0)

  const chartData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: "Total Houses",
        data: categories.map((category) => category.totalHouses),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Reserved Houses",
        data: categories.map((category) => category.reservedHouses),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Houses by Category",
      },
    },
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Houses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHouses}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reserved Houses</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReservedHouses}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Chart */}
        <Tabs defaultValue="houses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="houses">Houses</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          <TabsContent value="houses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Houses by Category</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Bar options={chartOptions} data={chartData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Bar
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        ...chartOptions.plugins.title,
                        text: "Revenue by Category",
                      },
                    },
                  }}
                  data={{
                    labels: categories.map((category) => category.name),
                    datasets: [
                      {
                        label: "Revenue",
                        data: categories.map((category) => category.revenue),
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Category Details */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Category Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Total Houses: {category.totalHouses}</p>
                  <p>Reserved Houses: {category.reservedHouses}</p>
                  <p>Revenue: ${category.revenue.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

