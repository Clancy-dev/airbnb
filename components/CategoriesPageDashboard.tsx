"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Category, House } from "@prisma/client"

interface CategoryDashboardProps {
  categories: Category[]
  houses: House[]
}

// Sample data (replace with actual data fetching in a real application)
const categories = [
  { id: 1, name: "Rooms", icon: "home", totalHouses: 10 },
  { id: 2, name: "Icons", icon: "landmark", totalHouses: 8 },
  { id: 3, name: "Bed and Breakfast", icon: "coffee", totalHouses: 12 },
  { id: 4, name: "Amazing Pools", icon: "droplets", totalHouses: 15 },
  { id: 5, name: "Cabins", icon: "trees", totalHouses: 6 },
  { id: 6, name: "Earth Homes", icon: "mountain", totalHouses: 4 },
  { id: 7, name: "Farms", icon: "wheat", totalHouses: 7 },
  { id: 8, name: "Countryside", icon: "mountain", totalHouses: 9 },
  { id: 9, name: "Mansions", icon: "building", totalHouses: 5 },
]

export default function CategoriesPageDashboard({ categories,houses }: CategoryDashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const totalHousesPerCategory = categories.map(category => {
    return {
      category: category.title,
      houseCount: houses.filter(house => house.categoryId === category.id).length
    };
  });
  
  console.log(totalHousesPerCategory);
  const handleCreate = () => {
    setShowCreateModal(true)
    // Implement create functionality
  }

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit category with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Delete category with id: ${id}`)
  }

  return (
    <div className="p-8">
      <Card className="mb-8 bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Categories</CardTitle>
          <Link href="/dashboard/new/category">
          <Button onClick={handleCreate} className="shadow-md font-medium border-gray-200 border-[1px]">
            <Plus className="mr-2 h-4 w-4" /> Create Category
          </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categories.length} Categories</div>
        </CardContent>
      </Card>

      <Card className="bg-white">
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Image</TableHead>
          <TableHead className="font-bold">Category Name</TableHead>
          <TableHead className="font-bold">Total Houses</TableHead>
          <TableHead className="text-right font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => {
          // Find the house count for this category
          const houseData = totalHousesPerCategory.find(item => item.category === category.title);
          
          return (
            <TableRow key={category.id}>
              <TableCell>
                <Image src={category.image} alt={category.title} width={24} height={24} />
              </TableCell>
              <TableCell className="font-medium">{category.title}</TableCell>
              <TableCell>{houseData ? houseData.houseCount : 0}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </CardContent>
</Card>


      {/* Add a modal or form for creating/editing categories */}
    </div>
  )
}

