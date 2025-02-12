"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import type { House } from "@prisma/client"

interface HouseDashboardProps {
  houses: House[]
}

export default function HousesPageDashboard({ houses }: HouseDashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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

  // Filter houses based on search query
  const filteredHouses = houses.filter((house) => house.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="lg:p-8 md:p-4 sm:p-2 p-2">
      <Card className="mb-8 bg-white">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">House Listing</CardTitle>
          <Link href="/new/house" className="shadow-md">
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" /> Create House
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-2xl font-bold">{filteredHouses.length} Total Houses</div>
            <div className="w-full sm:w-72">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search houses..."
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
            {filteredHouses.length > 0 ? (
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
                  {filteredHouses.map((house) => (
                    <TableRow key={house.id}>
                      <TableCell>
                        <Image
                          src={house.interiorImages[0] || "/placeholder.svg"}
                          alt={house.title}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{house.title}</TableCell>
                      <TableCell>{house.categoryTitle}</TableCell>
                      <TableCell>Ugshs{house.price}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link href={`/houses/${house.id}`}>
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
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-muted-foreground mb-2">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-1">No houses found</h3>
                  <p className="text-sm text-muted-foreground">No houses matching "{searchQuery}" were found.</p>
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

