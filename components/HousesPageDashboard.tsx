"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { House } from "@prisma/client"

interface HouseDashboardProps {
  houses: House[]
}

// Sample data (replace with actual data fetching in a real application)
const houses = [
  { id: 1, title: "Cozy Apartment", image: "/placeholder.svg", category: "Rooms", price: 150 },
  { id: 2, title: "Luxury Villa", image: "/placeholder.svg", category: "Mansions", price: 500 },
  { id: 3, title: "Rustic Cabin", image: "/placeholder.svg", category: "Cabins", price: 200 },
  { id: 4, title: "Beachfront Condo", image: "/placeholder.svg", category: "Amazing Pools", price: 300 },
  { id: 5, title: "City Loft", image: "/placeholder.svg", category: "Icons", price: 180 },
]

export default function HousesPageDashboard({ houses }: HouseDashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreate = () => {
    setShowCreateModal(true)
    // Implement create functionality
  }

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit house with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Delete house with id: ${id}`)
  }

  return (
    <div className="p-8">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Houses</CardTitle>
          <Link href="/new/house">
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> Create House
          </Button>
          </Link>
          
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{houses.length} Total Houses</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {houses.map((house) => (
                <TableRow key={house.id}>
                  <TableCell>
                    <Image
                      src={house.images[0] || "/placeholder.svg"}
                      alt={house.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{house.title}</TableCell>
                  <TableCell>{house.categoryTitle}</TableCell>
                  <TableCell>Ugshs{house.price}/night</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {/* <Button variant="ghost" size="icon" onClick={() => handleEdit(house.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button> */}
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {/* <Button variant="ghost" size="icon" onClick={() => handleDelete(house.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add a modal or form for creating/editing houses */}
    </div>
  )
}

