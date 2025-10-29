'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { getProjectTypeDisplayName } from '@/lib/author'

export default function AuthorProjectTabs({ userId, currentType, typeStats, totalProjects }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const navRef = useRef(null)
  const [activeTabStyle, setActiveTabStyle] = useState({ width: 0, left: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const createUrl = (type) => {
    const params = new URLSearchParams(searchParams)
    if (type) {
      params.set('type', type)
    } else {
      params.delete('type')
    }
    return `${pathname}?${params.toString()}`
  }

  const tabs = [
    { 
      key: null, 
      label: 'Все', 
      count: totalProjects,
      isActive: !currentType 
    }
  ]

  Object.entries(typeStats).forEach(([type, count]) => {
    if (count > 0) {
      tabs.push({
        key: type,
        label: getProjectTypeDisplayName(type),
        count,
        isActive: currentType === type
      })
    }
  })

  useEffect(() => {
    const updateActiveTabStyle = () => {
      if (navRef.current) {
        const activeIndex = tabs.findIndex(tab => tab.isActive)
        const activeLink = navRef.current.children[activeIndex]
        
        if (activeLink) {
          setActiveTabStyle({
            width: activeLink.offsetWidth,
            left: activeLink.offsetLeft
          })
        }
      }
    }

    // Небольшая задержка для корректного рендера
    const timer = setTimeout(updateActiveTabStyle, 10)
    
    return () => clearTimeout(timer)
  }, [currentType, tabs])

  // Также обновляем при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (navRef.current) {
        const activeIndex = tabs.findIndex(tab => tab.isActive)
        const activeLink = navRef.current.children[activeIndex]
        
        if (activeLink) {
          setActiveTabStyle({
            width: activeLink.offsetWidth,
            left: activeLink.offsetLeft
          })
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!mounted || tabs.length <= 1) {
    return null
  }

  return (
    <div className="mb-6 max-w-full overflow-x-auto">
      <nav ref={navRef} className="relative flex w-fit overflow-x-auto rounded-full bg-modrinth-dark border border-gray-800 p-1 text-sm font-bold shadow-lg">
        {tabs.map((tab) => (
          <Link
            key={tab.key || 'all'}
            href={createUrl(tab.key)}
            className={`
              relative z-10 flex items-center px-4 py-2 rounded-full transition-colors whitespace-nowrap
              ${tab.isActive 
                ? '' 
                : 'text-gray-300 hover:text-white'
              }
            `}
            style={tab.isActive ? { color: 'var(--color-green)' } : {}}
          >
            <span>{tab.label}</span>
          </Link>
        ))}
        
        {activeTabStyle.width > 0 && (
          <div 
            className="absolute h-[calc(100%-0.5rem)] rounded-full transition-all duration-300 ease-out pointer-events-none"
            style={{
              width: `${activeTabStyle.width}px`,
              left: `${activeTabStyle.left}px`,
              top: '0.25rem',
              backgroundColor: 'rgba(27,217,106,.25)'
            }}
          />
        )}
      </nav>
    </div>
  )
}
