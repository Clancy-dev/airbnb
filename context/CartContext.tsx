'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  id: number
  title: string
  price: number
  isRentable: boolean
}

interface CartContextType {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  isInCart: (productId: number) => boolean
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product])
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const isInCart = (productId: number): boolean => {
    return cartItems.some((item) => item.id === productId)
  }

  const getTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price, 0)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, getTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

