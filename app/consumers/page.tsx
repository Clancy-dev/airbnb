'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Package, CreditCard } from 'lucide-react'

interface Order {
  id: number
  items: string[]
  total: number
  status: string
  date: string
}

// freedom
export default function ConsumersDashboard() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, items: ['Fresh Apples', 'Organic Carrots'], total: 15.99, status: 'Delivered', date: '2023-05-15' },
    { id: 2, items: ['Farm Equipment Rental'], total: 199.99, status: 'In Progress', date: '2023-05-18' },
    { id: 3, items: ['Organic Milk', 'Free-range Eggs'], total: 12.50, status: 'Pending', date: '2023-05-20' },
  ])

  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter(order => order.status === 'Pending').length

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <Image
              src="/placeholder.svg"
              alt="Consumer's profile"
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
            <h1 className="text-3xl font-bold text-purple-800">Welcome back, Sarah</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="flex items-center">
                <ShoppingCart className="text-purple-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Total Orders</h2>
              </div>
              <p className="text-3xl font-bold mt-2">{totalOrders}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="text-green-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Total Spent</h2>
              </div>
              <p className="text-3xl font-bold mt-2">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <div className="flex items-center">
                <Package className="text-yellow-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Pending Orders</h2>
              </div>
              <p className="text-3xl font-bold mt-2">{pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg">Order #{order.id}</span>
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {order.items.includes('Farm Equipment Rental') ? (
                      <Package size={20} className="text-blue-500 mr-2" />
                    ) : (
                      <ShoppingCart size={20} className="text-green-500 mr-2" />
                    )}
                    <span>{order.items.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                      order.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

