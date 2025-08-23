"use client"

import type React from "react"
import { type ReactNode, useState } from "react"
import { FiGrid, FiEdit3, FiFileText, FiTrendingUp } from "react-icons/fi"
import { Link } from "react-router-dom"

interface SubItem {
  label: string
  link: string
  active?: boolean
}

interface SidebarItem {
  label: string
  icon: ReactNode
  link?: string
  active?: boolean
  subItems?: SubItem[]
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", icon: <FiGrid />, link: "/" },
  {
    label: "Content Hub",
    icon: <FiEdit3 />,
    active: true,
    subItems: [
      { label: "Workplace", link: "/content/workplace" },
      { label: "Ideation", link: "/content/ideation", active: true },
      { label: "Competitor Analysis", link: "/content/competitor" },
    ],
  },
  { label: "Campaign Hub", icon: <FiFileText />, link: "/campaigns" },
  { label: "Ads Manager", icon: <FiTrendingUp />, link: "/ads" },
]

const Sidebar: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>("Content Hub")

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-8 border-b border-gray-100">
        <div className="relative">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-900">Kelly Tan</h2>
        <p className="text-sm text-gray-500 font-medium">Status | Administrator</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6 px-4">
        {sidebarItems.map((item, index) => (
          <div key={index} className="mb-2">
            {item.link && !item.subItems ? (
              // Top-level link items (Dashboard, Campaign Hub, Ads Manager)
              <Link
                to={item.link}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={`text-lg ${item.active ? "text-white" : "text-gray-500"}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ) : (
              // Dropdown items (Content Hub)
              <>
                <button
                  onClick={() => setOpenItem(openItem === item.label ? null : item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    item.active
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className={`text-lg ${item.active ? "text-white" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {item.subItems && (
                    <span
                      className={`ml-auto text-sm transition-transform duration-200 ${
                        openItem === item.label ? "rotate-90" : ""
                      } ${item.active ? "text-white" : "text-gray-400"}`}
                    >
                      ▶
                    </span>
                  )}
                </button>

                {/* Submenu */}
                {item.subItems && openItem === item.label && (
                  <div className="ml-8 mt-2 space-y-1 bg-blue-50 rounded-lg p-3 border border-blue-100">
                    {item.subItems.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.link}
                        className={`block text-sm px-3 py-2 rounded-md transition-colors duration-150 ${
                          sub.active
                            ? "text-blue-700 font-semibold bg-blue-100"
                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
