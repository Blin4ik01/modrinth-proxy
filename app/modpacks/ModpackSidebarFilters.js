'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MC_VERSIONS_RELEASE, MC_VERSIONS_FULL } from '@/lib/mcVersions'

const LOADERS = [
  { id: 'fabric', name: 'Fabric', color: 'bg-amber-600' },
  { id: 'forge', name: 'Forge', color: 'bg-blue-600' },
  { id: 'neoforge', name: 'NeoForge', color: 'bg-orange-600' },
  { id: 'quilt', name: 'Quilt', color: 'bg-purple-600' },
]

const CATEGORIES = [
  { id: 'adventure', name: 'Приключения' },
  { id: 'challenging', name: 'Сложные' },
  { id: 'combat', name: 'Боевые' },
  { id: 'kitchen-sink', name: 'Всё вместе' },
  { id: 'lightweight', name: 'Лёгкие' },
  { id: 'magic', name: 'Магия' },
  { id: 'multiplayer', name: 'Мультиплеер' },
  { id: 'optimization', name: 'Оптимизация' },
  { id: 'quests', name: 'Квесты' },
  { id: 'technology', name: 'Технологии' },
]

const ENVIRONMENTS = [
  { id: 'required', name: 'Клиент' },
  { id: 'optional', name: 'Сервер' },
]

export default function ModpackSidebarFilters({ isMobile = false, onFilterChange }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedVersion, setSelectedVersion] = useState(searchParams.get('v') || '')
  const [selectedLoaders, setSelectedLoaders] = useState(
    searchParams.get('l')?.split(',').filter(Boolean) || []
  )
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('c')?.split(',').filter(Boolean) || []
  )
  const [selectedEnvironments, setSelectedEnvironments] = useState(
    searchParams.get('e')?.split(',').filter(Boolean) || []
  )
  const [showAllVersions, setShowAllVersions] = useState(false)
  const [versionSearch, setVersionSearch] = useState('')

  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams)
    
    if (updates.q !== undefined) {
      if (updates.q) params.set('q', updates.q)
      else params.delete('q')
    }
    
    if (updates.v !== undefined) {
      if (updates.v) params.set('v', updates.v)
      else params.delete('v')
    }
    
    if (updates.l !== undefined) {
      if (updates.l.length > 0) params.set('l', updates.l.join(','))
      else params.delete('l')
    }
    
    if (updates.c !== undefined) {
      if (updates.c.length > 0) params.set('c', updates.c.join(','))
      else params.delete('c')
    }
    
    if (updates.e !== undefined) {
      if (updates.e.length > 0) params.set('e', updates.e.join(','))
      else params.delete('e')
    }

    params.delete('page')
    
    router.push(`/modpacks?${params.toString()}`)
    onFilterChange?.()
  }

  const toggleLoader = (loaderId) => {
    const newLoaders = selectedLoaders.includes(loaderId)
      ? selectedLoaders.filter(l => l !== loaderId)
      : [...selectedLoaders, loaderId]
    setSelectedLoaders(newLoaders)
    updateFilters({ l: newLoaders })
  }

  const toggleCategory = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(newCategories)
    updateFilters({ c: newCategories })
  }

  const toggleEnvironment = (envId) => {
    const newEnvironments = selectedEnvironments.includes(envId)
      ? selectedEnvironments.filter(e => e !== envId)
      : [...selectedEnvironments, envId]
    setSelectedEnvironments(newEnvironments)
    updateFilters({ e: newEnvironments })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateFilters({ q: searchQuery })
  }

  return (
    <div className={isMobile ? "w-full" : "hidden lg:block w-80 flex-shrink-0 sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar"}>
      <div className="space-y-4">
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
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            Загрузчик
          </h3>
          <div className="space-y-2">
            {LOADERS.map(loader => (
              <button
                key={loader.id}
                onClick={() => toggleLoader(loader.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedLoaders.includes(loader.id)
                    ? `${loader.color} text-white shadow-lg`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  selectedLoaders.includes(loader.id) ? 'bg-white' : 'bg-gray-600'
                }`}></div>
                {loader.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Категории
          </h3>
          <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-modrinth-green text-black font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Окружение
          </h3>
          <div className="space-y-2">
            {ENVIRONMENTS.map(env => (
              <button
                key={env.id}
                onClick={() => toggleEnvironment(env.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedEnvironments.includes(env.id)
                    ? 'bg-modrinth-green text-black shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  selectedEnvironments.includes(env.id) ? 'bg-black' : 'bg-gray-600'
                }`}></div>
                {env.name}
              </button>
            ))}
          </div>
        </div>

        {(selectedVersion || selectedLoaders.length > 0 || selectedCategories.length > 0 || selectedEnvironments.length > 0 || searchQuery) && (
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-3">
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedVersion('')
                setSelectedLoaders([])
                setSelectedCategories([])
                setSelectedEnvironments([])
                router.push('/modpacks')
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

