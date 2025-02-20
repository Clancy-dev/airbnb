"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid, HomeIcon as House, Settings, ChevronRight, Globe, User } from "lucide-react"
import { cn } from "@/lib/utils"
import LogOut from "../LogOut"

const menuItems = [
  {
    title: "Users",
    icon: User,
    href: "/dashboard/users",
  },
  {
    title: "Overview",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Categories",
    icon: Grid,
    href: "/dashboard/categories",
  },
  {
    title: "Houses",
    icon: House,
    href: "/dashboard/houses",
  },
  {
    title: "Live Website",
    icon: Globe,
    href: "/",
  },
]

export default function SideBar() {
  const pathname = usePathname()

  return (
    <div className="w-[20rem] bg-white min-h-[85vh] left-0 top-[72px] hidden lg:block md:block sm:hidden border-r">
      <div className="p-6 w-full border-b">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="p-4">
        <nav className="space-y-2">
          <div className="py-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</p>
            <div className="mt-3 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </Link>
                )
              })}
            </div>
            
          </div>

          <div className="py-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</p>
            <div className="mt-3">
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/dashboard/settings"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4" />
                  Settings
                </div>
                
                {pathname === "/dashboard/settings" && <ChevronRight className="h-4 w-4" />}
              </Link>
              {/* <LogOut/> */}

              
            </div>
            <div className="mt-3 text-xs font-semibold text-gray-500 w-full min-h-8">
              <LogOut/>
            </div>
          </div>
        </nav>
      </div>

      {/* Profile Section at Bottom */}
      <div className=" p-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">CL</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">Clancy</h3>
            <p className="text-xs text-gray-500">clancy@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

