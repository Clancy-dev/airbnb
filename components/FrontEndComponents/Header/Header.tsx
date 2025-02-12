'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, X, Menu, Home, Tractor, Truck, Users, BarChart } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import SearchBar from '../../SearchBar'

export default function Header() {
  const { cartItems, removeFromCart, getTotal } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart },
    
  ]

  useEffect(() => {
    const closeMenus = () => {
      setIsCartOpen(false)
      setIsMenuOpen(false)
    }

    window.addEventListener('resize', closeMenus)
    return () => window.removeEventListener('resize', closeMenus)
  }, [])

  const NavLink = ({ href, label, icon: Icon }:any) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200
          ${isActive
            ? ' text-black font-bold'
            : 'text-gray-600 hover:text-black'
          }`}
      >
        <Icon size={20} className="mr-2" />
        {label}
      </Link>
    )
  }

  return (
    <>
      <header className=" p-4 sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold logo-font flex items-center justify-center gap-2">
          <div className='w-35 h-15 ml-[4rem]'>
            <Image
            alt="logo"
            src="/ac-logo.png"
            width={100}
            height={50}
            className="w-full h-full object-contain bg-black"
            />

          </div>
          


            
          </Link>
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            
            <button
              className="md:hidden text-white hover:text-green-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      {/* <SearchBar /> */}
      {isMenuOpen && (
        <div className="fixed inset-0  bg-opacity-50 z-50">
          <div className="bg-red-900 w-64 h-full overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b border-black">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-green-200">
                <X size={24} />
              </button>
            </div>
            <nav className="p-4">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      )}
     
    </>
  )
}

