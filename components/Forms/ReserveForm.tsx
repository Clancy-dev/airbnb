"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HouseProps } from "./HouseForm"


export default function ReservationForm({ house }: { house: HouseProps }) {
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => prev + 1)
  }

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reserve</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="text-2xl font-bold">${house.price}</span>
            <span className="text-gray-600"> per night</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="check-in">Check-in</Label>
              <div className="relative">
                <Input id="check-in" type="date" min={house.availableFrom} />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="check-out">Check-out</Label>
              <div className="relative">
                <Input id="check-out" type="date" max={house.availableTo} />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="guests">Guests</Label>
            <Select defaultValue="1">
              <SelectTrigger id="guests">
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 person</SelectItem>
                <SelectItem value="2">2 people</SelectItem>
                <SelectItem value="3">3 people</SelectItem>
                <SelectItem value="4">4 people</SelectItem>
                <SelectItem value="5">5 people</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Adults (Age 13+)</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDecrement(setAdults)}>
                  -
                </Button>
                <span>{adults}</span>
                <Button variant="outline" size="sm" onClick={() => handleIncrement(setAdults)}>
                  +
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Children (Ages 2–12)</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDecrement(setChildren)}>
                  -
                </Button>
                <span>{children}</span>
                <Button variant="outline" size="sm" onClick={() => handleIncrement(setChildren)}>
                  +
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Infants (Under 2)</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDecrement(setInfants)}>
                  -
                </Button>
                <span>{infants}</span>
                <Button variant="outline" size="sm" onClick={() => handleIncrement(setInfants)}>
                  +
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Pets</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDecrement(setPets)}>
                  -
                </Button>
                <span>{pets}</span>
                <Button variant="outline" size="sm" onClick={() => handleIncrement(setPets)}>
                  +
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full">Reserve</Button>
          <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
        </div>
      </CardContent>
    </Card>
  )
}

