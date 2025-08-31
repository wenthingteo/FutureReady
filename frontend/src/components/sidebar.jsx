"use client"

import { useState } from "react"
import { FiGrid, FiEdit3, FiFileText, FiTrendingUp, FiChevronRight, FiZap } from "react-icons/fi"
import { Link, useLocation } from "react-router-dom"

const sidebarItems = [
  { label: "Dashboard", icon: <FiGrid />, link: "/" },
  {
    label: "Content Hub",
    icon: <FiEdit3 />,
    subItems: [
      { label: "Workplace", link: "/content/workplace" },
      { label: "Ideation", link: "/content/ideation" },
      { label: "Competitor Analysis", link: "/content/competitor" },
    ],
  },
  { label: "Post Scheduler", icon: <FiFileText />, link: "/campaigns" },
  { label: "Ads Manager", icon: <FiTrendingUp />, link: "/ads" },
  { label: "Campify AI", icon: <FiZap />, link: "/ai-agent" },
]

const Sidebar = () => {
  const location = useLocation()
  const [openItem, setOpenItem] = useState(
    location.pathname.startsWith("/content") ? "Content Hub" : null
  )

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-8 border-b border-gray-100">
        <div className="relative">
          <img
            src="/neoneo.jpeg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50"
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-900">Kelly Tan</h2>
        <p className="text-sm text-gray-500 font-medium">Status | Administrator</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4">
        {sidebarItems.map((item, index) => {
          const isActiveTopLevel =
            item.link === location.pathname ||
            (item.subItems && item.subItems.some((sub) => sub.link === location.pathname))

          return (
            <div key={index} className="mb-2">
              {item.link && !item.subItems ? (
                // Top-level link items
                <Link
                  to={item.link}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActiveTopLevel
                      ? item.label === "Campify AI"
                        ? "bg-gradient-to-r from-[#3264DF] to-purple-600 text-white shadow-lg transform scale-105"
                        : "bg-[#475ECD] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className={`text-lg ${isActiveTopLevel ? "text-white" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ) : (
                // Dropdown items
                <>
                  <button
                    onClick={() =>
                      setOpenItem(openItem === item.label ? null : item.label)
                    }
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      isActiveTopLevel
                        ? "bg-[#475ECD] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className={`text-lg ${isActiveTopLevel ? "text-white" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {item.subItems && (
                      <span
                        className={`ml-auto text-sm transition-transform duration-200 ${
                          openItem === item.label ? "rotate-90" : ""
                        } ${isActiveTopLevel ? "text-white" : "text-gray-400"}`}
                      >
                        <FiChevronRight />
                      </span>
                    )}
                  </button>
                  {/* Submenu */}
                  {item.subItems && openItem === item.label && (
                    <div className="mt-2 space-y-1 bg-blue-50 rounded-lg p-3 border border-blue-100">
                      {item.subItems.map((sub, i) => {
                        const isActiveSub = sub.link === location.pathname
                        return (
                          <Link
                            key={i}
                            to={sub.link}
                            className={`block text-sm px-3 py-2 rounded-md transition-colors duration-150 ${
                              isActiveSub
                                ? "text-blue-700 font-semibold bg-blue-100"
                                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
