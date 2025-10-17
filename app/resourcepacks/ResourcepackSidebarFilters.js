'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MC_VERSIONS_RELEASE, MC_VERSIONS_FULL } from '@/lib/mcVersions'

const CATEGORIES = [
  { id: 'combat', name: 'Бой' },
  { id: 'cursed', name: 'Проклятое' },
  { id: 'decoration', name: 'Декорации' },
  { id: 'modded', name: 'Модифицированное' },
  { id: 'realistic', name: 'Реалистичное' },
  { id: 'simplistic', name: 'Минималистичное' },
  { id: 'themed', name: 'Тематическое' },
  { id: 'tweaks', name: 'Изменения' },
  { id: 'utility', name: 'Утилиты' },
  { id: 'vanilla-like', name: 'Ванильное' },
]

const FEATURES = [
  { id: 'audio', name: 'Аудио' },
  { id: 'blocks', name: 'Блоки' },
  { id: 'core-shaders', name: 'Core Shaders' },
  { id: 'entities', name: 'Существа' },
  { id: 'environment', name: 'Окружение' },
  { id: 'equipment', name: 'Снаряжение' },
  { id: 'fonts', name: 'Шрифты' },
  { id: 'gui', name: 'Интерфейс' },
  { id: 'items', name: 'Предметы' },
  { id: 'locale', name: 'Локализация' },
  { id: 'models', name: 'Модели' },
]

const RESOLUTIONS = [
  { id: '8x-', name: '8x или меньше' },
  { id: '16x', name: '16x' },
  { id: '32x', name: '32x' },
  { id: '48x', name: '48x' },
  { id: '64x', name: '64x' },
  { id: '128x', name: '128x' },
  { id: '256x', name: '256x' },
  { id: '512x+', name: '512x или больше' },
]

export default function ResourcepackSidebarFilters({ onFilterChange, isMobile = false }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const parseFacets = () => {
    let categories = searchParams.get('c')?.split(',').filter(Boolean) || []
    let features = searchParams.get('f')?.split(',').filter(Boolean) || []
    let version = searchParams.get('v') || ''
    
    const facetParam = searchParams.get('f')
    if (facetParam) {
      const rawFeatures = facetParam.split(',')
      const parsedFeatures = []
      
      rawFeatures.forEach(item => {
        if (item.includes(':')) {
          const [type, value] = item.split(':')
          if (type === 'categories') {
            if (!categories.includes(value)) categories.push(value)
          } else if (type === 'versions' && !version) {
            version = value
          }
        } else {
          parsedFeatures.push(item)
        }
      })
      
      features = parsedFeatures
    }
    
    return { categories, features, version }
  }
  
  const { categories: initialCategories, features: initialFeatures, version: initialVersion } = parseFacets()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedVersion, setSelectedVersion] = useState(initialVersion)
  const [selectedCategories, setSelectedCategories] = useState(initialCategories)
  const [selectedFeatures, setSelectedFeatures] = useState(initialFeatures)
  const [selectedResolutions, setSelectedResolutions] = useState(
    searchParams.get('r')?.split(',').filter(Boolean) || []
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
    
    if (updates.c !== undefined) {
      if (updates.c.length > 0) params.set('c', updates.c.join(','))
      else params.delete('c')
    }
    
    if (updates.f !== undefined) {
      if (updates.f.length > 0) params.set('f', updates.f.join(','))
      else params.delete('f')
    }
    
    if (updates.r !== undefined) {
      if (updates.r.length > 0) params.set('r', updates.r.join(','))
      else params.delete('r')
    }

    params.delete('page')
    
    router.push(`/resourcepacks?${params.toString()}`)
    onFilterChange?.()
  }

  const toggleCategory = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(newCategories)
    updateFilters({ c: newCategories })
  }

  const toggleFeature = (featureId) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(f => f !== featureId)
      : [...selectedFeatures, featureId]
    setSelectedFeatures(newFeatures)
    updateFilters({ f: newFeatures })
  }

  const toggleResolution = (resolutionId) => {
    const newResolutions = selectedResolutions.includes(resolutionId)
      ? selectedResolutions.filter(r => r !== resolutionId)
      : [...selectedResolutions, resolutionId]
    setSelectedResolutions(newResolutions)
    updateFilters({ r: newResolutions })
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Особенности
          </h3>
          <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-2">
            {FEATURES.map(feature => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                  selectedFeatures.includes(feature.id)
                    ? 'bg-modrinth-green text-black font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {feature.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Разрешение
          </h3>
          <div className="space-y-1.5">
            {RESOLUTIONS.map(res => (
              <button
                key={res.id}
                onClick={() => toggleResolution(res.id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all ${
                  selectedResolutions.includes(res.id)
                    ? 'bg-modrinth-green text-black font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {res.name}
              </button>
            ))}
          </div>
        </div>

        {(selectedVersion || selectedCategories.length > 0 || selectedFeatures.length > 0 || selectedResolutions.length > 0 || searchQuery) && (
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-3">
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedVersion('')
                setSelectedCategories([])
                setSelectedFeatures([])
                setSelectedResolutions([])
                router.push('/resourcepacks')
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


