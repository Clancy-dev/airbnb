"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import type { Category, House } from "@prisma/client"

interface CategoryDashboardProps {
  categories: Category[]
  houses: House[]
}

export default function CategoriesPageDashboard({ categories, houses }: CategoryDashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const totalHousesPerCategory = categories.map((category) => {
    return {
      category: category.title,
      houseCount: houses.filter((house) => house.categoryId === category.id).length,
    }
  })

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

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="lg:p-8 md:p-4 sm:p-2 p-2">
      <Card className="mb-8 bg-white">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Categories</CardTitle>
          <Link href="/dashboard/new/category">
            <Button onClick={handleCreate} className="shadow-md font-medium border-gray-200 border-[1px]">
              <Plus className="mr-2 h-4 w-4" /> Create Category
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-2xl font-bold">{filteredCategories.length} Categories</div>
            <div className="w-full sm:w-72">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent>
          <div className="overflow-x-auto">
            {filteredCategories.length > 0 ? (
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
                  {filteredCategories.map((category) => {
                    const houseData = totalHousesPerCategory.find((item) => item.category === category.title)

                    return (
                      <TableRow key={category.id}>
                        <TableCell>
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.title}
                            width={24}
                            height={24}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{category.title}</TableCell>
                        <TableCell>{houseData ? houseData.houseCount : 0}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Link href={`/dashboard/categories/${category.id}`}>
                            <Button variant="ghost" size="icon" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-muted-foreground mb-2">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-1">No categories found</h3>
                  <p className="text-sm text-muted-foreground">No categories matching "{searchQuery}" were found.</p>
                </div>
                {searchQuery && (
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

