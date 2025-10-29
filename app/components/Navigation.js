'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import NewsCounter from './NewsCounter'

export default function Navigation() {
  const pathname = usePathname()
  const [indicator, setIndicator] = useState({ left: 0, width: 0, height: 0, opacity: 0, color: 'modrinth-green' })
  const prevPathnameRef = useRef(null)
  const navRef = useRef(null)
  const linksRef = useRef({})
  const [hasAnimated, setHasAnimated] = useState(false)

  const getColorForPath = (path) => {
    if (path.startsWith('/mods')) return 'modrinth-green'
    if (path.startsWith('/resourcepacks')) return 'purple'
    if (path.startsWith('/datapacks')) return 'orange'
    if (path.startsWith('/shaders')) return 'cyan'
    if (path.startsWith('/modpacks')) return 'red'
    if (path.startsWith('/plugins')) return 'blue'
    if (path.startsWith('/news')) return 'yellow'
    return 'modrinth-green'
  }

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  useEffect(() => {
    const activeKey = Object.keys(linksRef.current).find(key => isActive(key))
    if (activeKey && linksRef.current[activeKey]) {
      const element = linksRef.current[activeKey]
      const navElement = navRef.current
      if (element && navElement) {
        const navRect = navElement.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        
        if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
          setHasAnimated(true)
        }
        
        setIndicator({
          left: elementRect.left - navRect.left,
          width: elementRect.width,
          height: elementRect.height,
          opacity: 1,
          color: getColorForPath(activeKey)
        })
        
        prevPathnameRef.current = pathname
      }
    } else {
      setIndicator(prev => ({ ...prev, opacity: 0 }))
    }
  }, [pathname])

  const getGradientClass = (color) => {
    const gradients = {
      'modrinth-green': 'from-modrinth-green/10 to-green-500/10',
      'purple': 'from-purple-500/10 to-pink-500/10',
      'orange': 'from-orange-500/10 to-amber-500/10',
      'cyan': 'from-cyan-500/10 to-blue-500/10',
      'red': 'from-red-500/10 to-rose-500/10',
      'blue': 'from-blue-500/10 to-cyan-500/10',
      'yellow': 'from-yellow-500/10 to-amber-500/10'
    }
    return gradients[color] || gradients['modrinth-green']
  }

  return (
    <div ref={navRef} className="hidden lg:flex items-center gap-0.5 md:gap-1 flex-1 overflow-x-auto custom-scrollbar relative">
      <div 
        className={`absolute rounded-lg bg-gradient-to-r pointer-events-none ${getGradientClass(indicator.color)} ${hasAnimated ? 'transition-all duration-700 ease-out' : ''}`}
        style={{
          left: `${indicator.left}px`,
          width: `${indicator.width}px`,
          height: `${indicator.height}px`,
          opacity: indicator.opacity,
          transform: 'translateZ(0)',
          top: '0'
        }}
      />
      
      <Link 
        ref={el => linksRef.current['/mods'] = el}
        href="/mods" 
        className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-10 hover:bg-modrinth-green/10">
        <span className={`text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive('/mods') ? 'text-modrinth-green' : 'text-gray-300 group-hover:text-modrinth-green'}`}>
          <svg className="hidden sm:inline w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16"></path>
            <path d="M3.29 7 12 12l8.71-5M12 22V12"></path>
          </svg>
          <span>Моды</span>
        </span>
      </Link>
      
      <Link 
        ref={el => linksRef.current['/resourcepacks'] = el}
        href="/resourcepacks" 
        className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-10 hover:bg-purple-500/10">
        <span className={`text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive('/resourcepacks') ? 'text-purple-400' : 'text-gray-300 group-hover:text-purple-400'}`}>
          <svg className="hidden sm:inline w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3"></path>
            <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7M14.5 17.5 4.5 15"></path>
          </svg>
          <span>Ресурспаки</span>
        </span>
      </Link>
      
      <Link 
        ref={el => linksRef.current['/datapacks'] = el}
        href="/datapacks" 
        className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-10 hover:bg-orange-500/10">
        <span className={`text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive('/datapacks') ? 'text-orange-400' : 'text-gray-300 group-hover:text-orange-400'}`}>
          <svg className="hidden sm:inline w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"></path>
          </svg>
          <span>Датапаки</span>
        </span>
      </Link>
      
      <Link 
        ref={el => linksRef.current['/shaders'] = el}
        href="/shaders" 
        className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-10 hover:bg-cyan-500/10">
        <span className={`text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive('/shaders') ? 'text-cyan-400' : 'text-gray-300 group-hover:text-cyan-400'}`}>
          <svg className="hidden sm:inline w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="6" cy="15" r="4"></circle>
            <circle cx="18" cy="15" r="4"></circle>
            <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2M2.5 13 5 7c.7-1.3 1.4-2 3-2M21.5 13 19 7c-.7-1.3-1.5-2-3-2"></path>
          </svg>
          <span>Шейдеры</span>
        </span>
      </Link>
      
      <Link 
        ref={el => linksRef.current['/modpacks'] = el}
        href="/modpacks" 
        className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-10 hover:bg-red-500/10">
        <span className={`text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive('/modpacks') ? 'text-red-400' : 'text-gray-300 group-hover:text-red-400'}`}>
          <svg className="hidden sm:inline w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 22v-9M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.66 1.66 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"></path>
            <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"></path>
            <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.64 1.64 0 0 0 1.63 0z"></path>
          </svg>
          <span>Модпаки</span>
        </span>
      </Link>
      
      <Link 
        ref={el => linksRef.current['/plugins'] = el}
        href="/plugins" 
        className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-10 hover:bg-blue-500/10">
        <span className={`text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive('/plugins') ? 'text-blue-400' : 'text-gray-300 group-hover:text-blue-400'}`}>
          <svg className="hidden sm:inline w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path>
          </svg>
          <span>Плагины</span>
        </span>
      </Link>
      
      <div className="flex-1"></div>
      
      <Link 
        ref={el => linksRef.current['/news'] = el}
        href="/news" 
        className="group relative px-2.5 md:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-10 hover:bg-yellow-500/10">
        <span className={`text-xs md:text-sm font-semibold transition-colors flex items-center gap-1.5 relative ${isActive('/news') ? 'text-yellow-400' : 'text-gray-300 group-hover:text-yellow-400'}`}>
          <svg className="hidden sm:inline w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
            <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"></path>
          </svg>
          <span className="relative">
            Новости
            <NewsCounter />
          </span>
        </span>
      </Link>
    </div>
  )
}


