'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MC_VERSIONS_RELEASE, MC_VERSIONS_FULL } from '@/lib/mcVersions'
import { CATEGORIES } from '@/lib/categories'

export default function DatapackSidebarFilters({ onFilterChange, isMobile = false }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const parseFacets = () => {
    const fParams = searchParams.getAll('f')
    const categories = []
    const excludedCategories = []
    
    fParams.forEach(param => {
      const decoded = decodeURIComponent(param)
      if (decoded.includes('categories:')) {
        const value = decoded.replace('categories:', '')
        categories.push(value)
      } else if (decoded.includes('categories!=')) {
        const value = decoded.replace('categories!=', '')
        excludedCategories.push(value)
      }
    })
    
    const version = searchParams.get('v') || ''
    const lParam = searchParams.get('l')
    const openSourceState = lParam === 'open_source:true' ? 'selected' : lParam === 'open_source:false' ? 'excluded' : 'none'
    
    return { categories, excludedCategories, version, openSourceState }
  }
  
  const { categories: initialCategories, excludedCategories: initialExcludedCategories, version: initialVersion, openSourceState: initialOpenSourceState } = parseFacets()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedVersion, setSelectedVersion] = useState(initialVersion)
  const [selectedCategories, setSelectedCategories] = useState(initialCategories)
  const [excludedCategories, setExcludedCategories] = useState(initialExcludedCategories)
  const [openSourceState, setOpenSourceState] = useState(initialOpenSourceState)
  const [showAllVersions, setShowAllVersions] = useState(false)
  const [versionSearch, setVersionSearch] = useState('')

  const updateFilters = (updates) => {
    const params = new URLSearchParams()
    
    if (updates.q !== undefined) {
      if (updates.q) params.set('q', updates.q)
    } else {
      const q = searchParams.get('q')
      if (q) params.set('q', q)
    }
    
    if (updates.v !== undefined) {
      if (updates.v) params.set('v', updates.v)
    } else {
      const v = searchParams.get('v')
      if (v) params.set('v', v)
    }
    
    const currentCategories = updates.c !== undefined ? updates.c : selectedCategories
    const currentExcludedCategories = updates.ce !== undefined ? updates.ce : excludedCategories
    
    currentCategories.forEach(c => params.append('f', `categories:${c}`))
    currentExcludedCategories.forEach(c => params.append('f', `categories!=${c}`))
    
    const currentOpenSourceState = updates.os !== undefined ? updates.os : openSourceState
    if (currentOpenSourceState === 'selected') params.set('l', 'open_source:true')
    else if (currentOpenSourceState === 'excluded') params.set('l', 'open_source:false')
    
    router.push(`/datapacks?${params.toString()}`)
    onFilterChange?.()
  }

  const toggleCategory = (categoryId) => {
    const isSelected = selectedCategories.includes(categoryId)
    const isExcluded = excludedCategories.includes(categoryId)
    let newCategories = [...selectedCategories]
    let newExcluded = [...excludedCategories]
    
    if (isSelected) {
      newCategories = newCategories.filter(c => c !== categoryId)
    } else {
      newCategories.push(categoryId)
      if (isExcluded) {
        newExcluded = newExcluded.filter(c => c !== categoryId)
      }
    }
    
    setSelectedCategories(newCategories)
    setExcludedCategories(newExcluded)
    updateFilters({ c: newCategories, ce: newExcluded })
  }

  const toggleCategoryExclude = (categoryId, e) => {
    e.stopPropagation()
    const isExcluded = excludedCategories.includes(categoryId)
    const isSelected = selectedCategories.includes(categoryId)
    let newExcluded = [...excludedCategories]
    let newCategories = [...selectedCategories]
    
    if (isExcluded) {
      newExcluded = newExcluded.filter(c => c !== categoryId)
    } else {
      newExcluded.push(categoryId)
      if (isSelected) {
        newCategories = newCategories.filter(c => c !== categoryId)
      }
    }
    
    setExcludedCategories(newExcluded)
    setSelectedCategories(newCategories)
    updateFilters({ c: newCategories, ce: newExcluded })
  }

  return (
    <div className={isMobile ? "w-full" : "hidden lg:block w-80 flex-shrink-0"}>
      <div className="space-y-4">
        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Категории
          </h3>
          <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-2">
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategories.includes(cat.id)
              const isExcluded = excludedCategories.includes(cat.id)
              
              return (
                <div key={cat.id} className="flex gap-1 items-center group">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex-1 text-left px-2 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      isExcluded
                        ? 'text-white hover:brightness-125'
                        : isSelected
                          ? 'text-white hover:brightness-125'
                          : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                    style={
                      isExcluded
                        ? { backgroundColor: 'rgba(255, 73, 110, 0.25)' }
                        : isSelected
                          ? { backgroundColor: 'rgba(27, 217, 106, 0.25)' }
                          : undefined
                    }
                  >
                    <div className="h-4 w-4 flex-shrink-0">{cat.icon}</div>
                    <span className="truncate text-sm flex-1">{cat.name}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => toggleCategoryExclude(cat.id, e)}
                    title="Исключить"
                    className={`flex items-center justify-center rounded-xl px-2 py-1 text-sm font-semibold transition-all ${
                      isExcluded
                        ? 'text-white hover:brightness-125'
                        : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-red-400'
                    } ${isExcluded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={isExcluded ? { backgroundColor: 'rgba(255, 73, 110, 0.25)' } : undefined}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.9 4.9 14.2 14.2" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Версия игры
          </h3>
          
          <div className="mb-2 relative">
            <input
              type="text"
              placeholder="Поиск..."
              value={versionSearch}
              onChange={(e) => setVersionSearch(e.target.value)}
              className="w-full px-3 py-2 pl-9 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-modrinth-green transition-colors"
            />
            <svg 
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0" />
            </svg>
          </div>

          <div className="space-y-1 max-h-52 overflow-y-auto custom-scrollbar pr-2 mb-2">
            {(() => {
              const versions = showAllVersions ? MC_VERSIONS_FULL : MC_VERSIONS_RELEASE
              const filteredVersions = versionSearch
                ? versions.filter(v => v.toLowerCase().includes(versionSearch.toLowerCase()))
                : versions
              
              return filteredVersions.map(version => (
                <button
                  key={version}
                  onClick={() => {
                    const newVersion = selectedVersion === version ? '' : version
                    setSelectedVersion(newVersion)
                    updateFilters({ v: newVersion })
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all group flex items-center justify-between ${
                    selectedVersion === version
                      ? 'bg-modrinth-green text-black font-semibold'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span>{version}</span>
                  {selectedVersion === version && (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))
            })()}
          </div>

          <div className="pt-2 border-t border-gray-800">
            <button
              onClick={() => setShowAllVersions(!showAllVersions)}
              className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-800 rounded transition-colors group"
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                showAllVersions 
                  ? 'bg-modrinth-green border-modrinth-green' 
                  : 'border-gray-600 group-hover:border-gray-500'
              }`}>
                {showAllVersions && (
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                Показать все версии
              </span>
            </button>
          </div>
        </div>

        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Прочее</h3>
          <div className="flex gap-1 items-center group">
            <button
              onClick={() => {
                const newState = openSourceState === 'selected' ? 'none' : 'selected'
                setOpenSourceState(newState)
                updateFilters({ os: newState })
              }}
              className={`flex-1 text-left px-2 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                openSourceState === 'excluded'
                  ? 'text-white hover:brightness-125'
                  : openSourceState === 'selected'
                    ? 'text-white hover:brightness-125'
                    : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              style={
                openSourceState === 'excluded'
                  ? { backgroundColor: 'rgba(255, 73, 110, 0.25)' }
                  : openSourceState === 'selected'
                    ? { backgroundColor: 'rgba(27, 217, 106, 0.25)' }
                    : undefined
              }
            >
              <span className="truncate text-sm flex-1">Открытый исходный код</span>
              <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${openSourceState === 'selected' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                const newState = openSourceState === 'excluded' ? 'none' : 'excluded'
                setOpenSourceState(newState)
                updateFilters({ os: newState })
              }}
              title="Исключить"
              className={`flex items-center justify-center rounded-xl px-2 py-1 text-sm font-semibold transition-all ${
                openSourceState === 'excluded'
                  ? 'text-white hover:brightness-125'
                  : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-red-400'
              } ${openSourceState === 'excluded' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              style={openSourceState === 'excluded' ? { backgroundColor: 'rgba(255, 73, 110, 0.25)' } : undefined}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.9 4.9 14.2 14.2" />
              </svg>
            </button>
          </div>
        </div>

        {(selectedVersion || selectedCategories.length > 0 || excludedCategories.length > 0 || openSourceState !== 'none' || searchQuery) && (
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-3">
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedVersion('')
                setSelectedCategories([])
                setExcludedCategories([])
                setOpenSourceState('none')
                router.push('/datapacks')
              }}
              className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-red-600/30 flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
