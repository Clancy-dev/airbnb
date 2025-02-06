'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Plus, Truck, DollarSign, TrendingUp } from 'lucide-react'

interface Vehicle {
  id: number
  name: string
  type: string
  capacity: string
  rate: number
  available: boolean
}

export default function TransportProvidersPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: 'Truck 1', type: 'Refrigerated', capacity: '5 tons', rate: 100, available: true },
    { id: 2, name: 'Van 1', type: 'Standard', capacity: '1 ton', rate: 50, available: false },
    { id: 3, name: 'Truck 2', type: 'Flatbed', capacity: '10 tons', rate: 150, available: true },
  ])

  const totalVehicles = vehicles.length
  const availableVehicles = vehicles.filter(vehicle => vehicle.available).length
  const totalRevenue = vehicles.reduce((sum, vehicle) => sum + vehicle.rate, 0)

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <Image
              src="/placeholder.svg"
              alt="Transport Provider's profile"
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
            <h1 className="text-3xl font-bold text-blue-800">Welcome back, John</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex items-center">
                <Truck className="text-blue-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Total Vehicles</h2>
              </div>
              <p className="text-3xl font-bold mt-2">{totalVehicles}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="text-green-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Available Vehicles</h2>
              </div>
              <p className="text-3xl font-bold mt-2">{availableVehicles}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="text-yellow-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Total Revenue</h2>
              </div>
              <p className="text-3xl font-bold mt-2">${totalRevenue}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Vehicles</h2>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Vehicle
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Capacity</th>
                    <th className="px-4 py-2">Rate</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-b">
                      <td className="px-4 py-2">{vehicle.name}</td>
                      <td className="px-4 py-2">{vehicle.type}</td>
                      <td className="px-4 py-2">{vehicle.capacity}</td>
                      <td className="px-4 py-2">${vehicle.rate}/day</td>
                      <td className="px-4 py-2">
                        {vehicle.available ? (
                          <span className="text-green-600">Available</span>
                        ) : (
                          <span className="text-red-600">Not Available</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-blue-500 hover:text-blue-700 mr-2">
                          <Pencil size={20} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
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

