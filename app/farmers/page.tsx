'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Plus, Package, DollarSign, TrendingUp } from 'lucide-react'
import AddProductForm from '../../components/AddProductForm'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  category: string
  price: number
  inStock: boolean
  isRentable: boolean
}

export default function FarmersDashboard() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 2.99, inStock: true, isRentable: false },
    { id: 2, name: 'Organic Carrots', category: 'Vegetables', price: 1.99, inStock: true, isRentable: false },
    { id: 3, name: 'Tractor', category: 'Farm Equipment', price: 199.99, inStock: false, isRentable: true },
  ])


  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)
  const inStockProducts = products.filter(product => product.inStock).length

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <Image
              src="/farmer-pic.png"
              alt="Farmer's profile"
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
            <h1 className="text-3xl font-bold text-green-800">Welcome back, Clancy</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center">
                <Package className="text-green-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Total Products</h2>
              </div>
              <p className="text-3xl font-bold mt-2">{totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="text-blue-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Total Value</h2>
              </div>
              <p className="text-3xl font-bold mt-2">${totalValue.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="text-yellow-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">In Stock</h2>
              </div>
              <p className="text-3xl font-bold mt-2">{inStockProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Categories</h2>
              <Link href="/new/category">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Category
              </button>
              </Link>
              
            </div>
            
            {/* Categories */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">
                        <button className="text-blue-500 hover:text-blue-700 mr-2">
                          <Pencil size={20} />
                        </button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product.id)}>
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Products</h2>
              <Link href="/new/product">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Product
              </button>
              </Link>
              
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        {product.inStock ? (
                          <span className="text-green-600">In Stock</span>
                        ) : product.isRentable ? (
                          <span className="text-blue-600">For Rent</span>
                        ) : (
                          <span className="text-red-600">Out of Stock</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-blue-500 hover:text-blue-700 mr-2">
                          <Pencil size={20} />
                        </button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product.id)}>
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

