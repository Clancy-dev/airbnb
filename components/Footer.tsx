import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h2 className="text-2xl font-bold text-green-400 tracking-wide  logo-font">Agri-Connect</h2>
            <p className="text-gray-400 text-sm">
              Connecting farmers, transport providers, and consumers for a sustainable agricultural ecosystem.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-400">
                <span className="sr-only">Facebook</span>
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400">
                <span className="sr-only">Twitter</span>
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400">
                <span className="sr-only">Instagram</span>
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400">
                <span className="sr-only">LinkedIn</span>
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      For Farmers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      For Transport Providers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      For Consumers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Marketplace
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      API Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Fertilizers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Brands
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Experienced Farmers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Farm Trucks
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base text-gray-400 hover:text-green-300">
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">Contact</h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-green-400" />
                    <a href="mailto:clancyro1000@gmail.com" className="text-base text-gray-400 hover:text-green-300">
                      agriconnect@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-green-400" />
                    <a href="tel:+256 770983239" className="text-base text-gray-400 hover:text-green-300">
                      +256 770983239
                    </a>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="mr-2 h-5 w-5 text-green-400 mt-1" />
                    <span className="text-base text-gray-400">
                      Nakimbugwe Building,<br />First Floor,<br />Room 2
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2025 Agri-Connect, Inc. All rights reserved.
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">By Clancy Developer</p>
        </div>
      </div>
    </footer>
  )
}

