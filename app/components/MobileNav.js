'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function MobileNav({ onFilterClick }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    if (path === '/mods') return pathname.startsWith('/mods')
    if (path === '/plugins') return pathname.startsWith('/plugins')
    if (path === '/shaders') return pathname.startsWith('/shaders')
    if (path === '/resourcepacks') return pathname.startsWith('/resourcepacks')
    if (path === '/datapacks') return pathname.startsWith('/datapacks')
    if (path === '/modpacks') return pathname.startsWith('/modpacks')
    if (path === '/news') return pathname.startsWith('/news')
    return false
  }

  const navItems = [
    { 
      href: '/', 
      label: 'Главная', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>,
      color: 'from-modrinth-green to-green-500' 
    },
    { 
      href: '/mods', 
      label: 'Моды', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16"></path><path d="M3.29 7 12 12l8.71-5M12 22V12"></path></svg>,
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      href: '/resourcepacks', 
      label: 'Ресурспаки', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3"></path><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7M14.5 17.5 4.5 15"></path></svg>,
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      href: '/datapacks', 
      label: 'Датапаки', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"></path></svg>,
      color: 'from-orange-500 to-amber-500' 
    },
    { 
      href: '/shaders', 
      label: 'Шейдеры', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="6" cy="15" r="4"></circle><circle cx="18" cy="15" r="4"></circle><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2M2.5 13 5 7c.7-1.3 1.4-2 3-2M21.5 13 19 7c-.7-1.3-1.5-2-3-2"></path></svg>,
      color: 'from-cyan-500 to-blue-500' 
    },
    { 
      href: '/modpacks', 
      label: 'Модпаки', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22v-9M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.66 1.66 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"></path><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"></path><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.64 1.64 0 0 0 1.63 0z"></path></svg>,
      color: 'from-red-500 to-rose-500' 
    },
    { 
      href: '/plugins', 
      label: 'Плагины', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>,
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      href: '/news', 
      label: 'Новости', 
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"></path></svg>,
      color: 'from-yellow-500 to-amber-500' 
    },
  ]

  const showFilterButton = pathname.startsWith('/mods') || 
                          pathname.startsWith('/plugins') || 
                          pathname.startsWith('/shaders') || 
                          pathname.startsWith('/resourcepacks') || 
                          pathname.startsWith('/datapacks') ||
                          pathname.startsWith('/modpacks')

  const handleFilterClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toggleMobileFilter'))
    }
  }

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
            <span>Главная</span>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Меню</span>
          </button>
          
          {showFilterButton && (
            <button
              onClick={handleFilterClick}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-medium transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Фильтр</span>
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-700 rounded-t-3xl shadow-2xl pb-safe animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
            </div>
            
            <div className="p-3 pb-16">
              <h3 className="text-sm font-bold text-white mb-3 text-center">Навигация</h3>
              
              <div className="grid grid-cols-2 gap-2 mobile-nav-grid">
                {navItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                        active
                          ? 'bg-gradient-to-br ' + item.color + ' shadow-md'
                          : 'bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      <div className={active ? 'text-white' : 'text-gray-400'}>
                        {item.icon}
                      </div>
                      <span className={`text-sm font-medium text-center ${
                        active ? 'text-white' : 'text-gray-300'
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


