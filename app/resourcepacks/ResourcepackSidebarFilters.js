'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MC_VERSIONS_RELEASE, MC_VERSIONS_FULL } from '@/lib/mcVersions'
import { RESOURCEPACK_CATEGORIES } from '@/lib/resourcepackCategories'

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
    const fParams = searchParams.getAll('f')
    const gParams = searchParams.getAll('g')
    
    const categories = []
    const excludedCategories = []
    const features = []
    const excludedFeatures = []
    const resolutions = []
    const excludedResolutions = []
    
    const categoryIds = CATEGORIES.map(c => c.id)
    const featureIds = RESOURCEPACK_CATEGORIES.map(f => f.id)
    const resolutionIds = RESOLUTIONS.map(r => r.id)
    
    const processParam = (param) => {
      let decoded = decodeURIComponent(param)
      
      if (decoded.includes('categories:') || decoded.includes('categories!=')) {
        const isExcluded = decoded.includes('categories!=')
        const value = decoded.replace('categories:', '').replace('categories!=', '')
        
        if (categoryIds.includes(value)) {
          if (isExcluded) excludedCategories.push(value)
          else categories.push(value)
        } else if (featureIds.includes(value)) {
          if (isExcluded) excludedFeatures.push(value)
          else features.push(value)
        } else if (resolutionIds.includes(value)) {
          if (isExcluded) excludedResolutions.push(value)
          else resolutions.push(value)
        }
      }
    }
    
    fParams.forEach(processParam)
    gParams.forEach(processParam)
    
    const version = searchParams.get('v') || ''
    
    return { categories, excludedCategories, features, excludedFeatures, resolutions, excludedResolutions, version }
  }
  
  const { 
    categories: initialCategories, 
    excludedCategories: initialExcludedCategories,
    features: initialFeatures, 
    excludedFeatures: initialExcludedFeatures,
    resolutions: initialResolutions,
    excludedResolutions: initialExcludedResolutions,
    version: initialVersion 
  } = parseFacets()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedVersion, setSelectedVersion] = useState(initialVersion)
  const [selectedCategories, setSelectedCategories] = useState(initialCategories)
  const [excludedCategories, setExcludedCategories] = useState(initialExcludedCategories)
  const [selectedFeatures, setSelectedFeatures] = useState(initialFeatures)
  const [excludedFeatures, setExcludedFeatures] = useState(initialExcludedFeatures)
  const [selectedResolutions, setSelectedResolutions] = useState(initialResolutions)
  const [excludedResolutions, setExcludedResolutions] = useState(initialExcludedResolutions)
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
    const currentFeatures = updates.feat !== undefined ? updates.feat : selectedFeatures
    const currentExcludedFeatures = updates.fe !== undefined ? updates.fe : excludedFeatures
    const currentResolutions = updates.r !== undefined ? updates.r : selectedResolutions
    const currentExcludedResolutions = updates.re !== undefined ? updates.re : excludedResolutions
    
    currentCategories.forEach(c => params.append('f', `categories:${c}`))
    currentExcludedCategories.forEach(c => params.append('f', `categories!=${c}`))
    currentFeatures.forEach(f => params.append('f', `categories:${f}`))
    currentExcludedFeatures.forEach(f => params.append('f', `categories!=${f}`))
    currentResolutions.forEach(r => params.append('f', `categories:${r}`))
    currentExcludedResolutions.forEach(r => params.append('f', `categories!=${r}`))
    
    router.push(`/resourcepacks?${params.toString()}`)
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

  const toggleFeature = (featureId) => {
    const isSelected = selectedFeatures.includes(featureId)
    const isExcluded = excludedFeatures.includes(featureId)
    let newFeatures = [...selectedFeatures]
    let newExcluded = [...excludedFeatures]
    
    if (isSelected) {
      newFeatures = newFeatures.filter(f => f !== featureId)
    } else {
      newFeatures.push(featureId)
      if (isExcluded) {
        newExcluded = newExcluded.filter(f => f !== featureId)
      }
    }
    
    setSelectedFeatures(newFeatures)
    setExcludedFeatures(newExcluded)
    updateFilters({ feat: newFeatures, fe: newExcluded })
  }

  const toggleFeatureExclude = (featureId, e) => {
    e.stopPropagation()
    const isExcluded = excludedFeatures.includes(featureId)
    const isSelected = selectedFeatures.includes(featureId)
    let newExcluded = [...excludedFeatures]
    let newFeatures = [...selectedFeatures]
    
    if (isExcluded) {
      newExcluded = newExcluded.filter(f => f !== featureId)
    } else {
      newExcluded.push(featureId)
      if (isSelected) {
        newFeatures = newFeatures.filter(f => f !== featureId)
      }
    }
    
    setExcludedFeatures(newExcluded)
    setSelectedFeatures(newFeatures)
    updateFilters({ f: newFeatures, fe: newExcluded })
  }

  const toggleResolution = (resolutionId) => {
    const isSelected = selectedResolutions.includes(resolutionId)
    const isExcluded = excludedResolutions.includes(resolutionId)
    let newResolutions = [...selectedResolutions]
    let newExcluded = [...excludedResolutions]
    
    if (isSelected) {
      newResolutions = newResolutions.filter(r => r !== resolutionId)
    } else {
      newResolutions.push(resolutionId)
      if (isExcluded) {
        newExcluded = newExcluded.filter(r => r !== resolutionId)
      }
    }
    
    setSelectedResolutions(newResolutions)
    setExcludedResolutions(newExcluded)
    updateFilters({ r: newResolutions, re: newExcluded })
  }

  const toggleResolutionExclude = (resolutionId, e) => {
    e.stopPropagation()
    const isExcluded = excludedResolutions.includes(resolutionId)
    const isSelected = selectedResolutions.includes(resolutionId)
    let newExcluded = [...excludedResolutions]
    let newResolutions = [...selectedResolutions]
    
    if (isExcluded) {
      newExcluded = newExcluded.filter(r => r !== resolutionId)
    } else {
      newExcluded.push(resolutionId)
      if (isSelected) {
        newResolutions = newResolutions.filter(r => r !== resolutionId)
      }
    }
    
    setExcludedResolutions(newExcluded)
    setSelectedResolutions(newResolutions)
    updateFilters({ r: newResolutions, re: newExcluded })
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Особенности
          </h3>
          <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-2">
            {RESOURCEPACK_CATEGORIES.map(feature => {
              const isSelected = selectedFeatures.includes(feature.id)
              const isExcluded = excludedFeatures.includes(feature.id)
              
              return (
                <div key={feature.id} className="flex gap-1 items-center group">
                  <button
                    onClick={() => toggleFeature(feature.id)}
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
                    <div className="h-4 w-4 flex-shrink-0">{feature.icon}</div>
                    <span className="truncate text-sm flex-1">{feature.name}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => toggleFeatureExclude(feature.id, e)}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Разрешение
          </h3>
          <div className="space-y-1.5">
            {RESOLUTIONS.map(res => {
              const isSelected = selectedResolutions.includes(res.id)
              const isExcluded = excludedResolutions.includes(res.id)
              
              return (
                <div key={res.id} className="flex gap-1 items-center group">
                  <button
                    onClick={() => toggleResolution(res.id)}
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
                    <span className="truncate text-sm flex-1">{res.name}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => toggleResolutionExclude(res.id, e)}
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

        {(selectedVersion || selectedCategories.length > 0 || excludedCategories.length > 0 || selectedFeatures.length > 0 || excludedFeatures.length > 0 || selectedResolutions.length > 0 || excludedResolutions.length > 0 || searchQuery) && (
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-3">
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedVersion('')
                setSelectedCategories([])
                setExcludedCategories([])
                setSelectedFeatures([])
                setExcludedFeatures([])
                setSelectedResolutions([])
                setExcludedResolutions([])
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
