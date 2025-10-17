'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MC_VERSIONS_RELEASE, MC_VERSIONS_FULL } from '@/lib/mcVersions'
import { SHADER_STYLES, SHADER_FEATURES, SHADER_PERFORMANCE } from '@/lib/shaderCategories'
import { SHADER_LOADERS } from '@/lib/loaders'

export default function ShaderSidebarFilters({ onFilterChange, isMobile = false }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const parseFacets = () => {
    const fParams = searchParams.getAll('f')
    const gParams = searchParams.getAll('g')
    
    const styles = []
    const excludedStyles = []
    const features = []
    const excludedFeatures = []
    const performance = []
    const excludedPerformance = []
    const loaders = []
    const excludedLoaders = []
    
    const styleIds = SHADER_STYLES.map(s => s.id)
    const featureIds = SHADER_FEATURES.map(f => f.id)
    const performanceIds = SHADER_PERFORMANCE.map(p => p.id)
    
    const processParam = (param) => {
      let decoded = decodeURIComponent(param)
      
      if (decoded.includes('categories:') || decoded.includes('categories!=')) {
        const isExcluded = decoded.includes('categories!=')
        const value = decoded.replace('categories:', '').replace('categories!=', '')
        
        if (styleIds.includes(value)) {
          if (isExcluded) excludedStyles.push(value)
          else styles.push(value)
        } else if (featureIds.includes(value)) {
          if (isExcluded) excludedFeatures.push(value)
          else features.push(value)
        } else if (performanceIds.includes(value)) {
          if (isExcluded) excludedPerformance.push(value)
          else performance.push(value)
        }
      }
    }
    
    fParams.forEach(processParam)
    
    gParams.forEach(param => {
      const decoded = decodeURIComponent(param)
      if (decoded.includes('categories:')) {
        const value = decoded.replace('categories:', '')
        loaders.push(value)
      } else if (decoded.includes('categories!=')) {
        const value = decoded.replace('categories!=', '')
        excludedLoaders.push(value)
      }
    })
    
    const version = searchParams.get('v') || ''
    const lParam = searchParams.get('l')
    const openSourceState = lParam === 'open_source:true' ? 'selected' : lParam === 'open_source:false' ? 'excluded' : 'none'
    
    return { styles, excludedStyles, features, excludedFeatures, performance, excludedPerformance, loaders, excludedLoaders, version, openSourceState }
  }
  
  const { styles: initialStyles, excludedStyles: initialExcludedStyles, features: initialFeatures, excludedFeatures: initialExcludedFeatures, performance: initialPerformance, excludedPerformance: initialExcludedPerformance, loaders: initialLoaders, excludedLoaders: initialExcludedLoaders, version: initialVersion, openSourceState: initialOpenSourceState } = parseFacets()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedVersion, setSelectedVersion] = useState(initialVersion)
  const [selectedStyles, setSelectedStyles] = useState(initialStyles)
  const [excludedStyles, setExcludedStyles] = useState(initialExcludedStyles)
  const [selectedFeatures, setSelectedFeatures] = useState(initialFeatures)
  const [excludedFeatures, setExcludedFeatures] = useState(initialExcludedFeatures)
  const [selectedPerformance, setSelectedPerformance] = useState(initialPerformance)
  const [excludedPerformance, setExcludedPerformance] = useState(initialExcludedPerformance)
  const [selectedLoaders, setSelectedLoaders] = useState(initialLoaders)
  const [excludedLoaders, setExcludedLoaders] = useState(initialExcludedLoaders)
  const [openSourceState, setOpenSourceState] = useState(initialOpenSourceState)
  const [showAllVersions, setShowAllVersions] = useState(false)
  const [versionSearch, setVersionSearch] = useState('')

  const updateFilters = (updates) => {
    const params = new URLSearchParams()
    
    if (updates.q !== undefined) {
      if (updates.q) params.set('q', updates.q)
    } else if (searchQuery) {
      params.set('q', searchQuery)
    }
    
    const currentVersion = updates.v !== undefined ? updates.v : selectedVersion
    if (currentVersion) params.set('v', currentVersion)
    
    const currentStyles = updates.s !== undefined ? updates.s : selectedStyles
    const currentExcludedStyles = updates.se !== undefined ? updates.se : excludedStyles
    const currentFeatures = updates.feat !== undefined ? updates.feat : selectedFeatures
    const currentExcludedFeatures = updates.fe !== undefined ? updates.fe : excludedFeatures
    const currentPerformance = updates.p !== undefined ? updates.p : selectedPerformance
    const currentExcludedPerformance = updates.pe !== undefined ? updates.pe : excludedPerformance
    const currentLoaders = updates.l !== undefined ? updates.l : selectedLoaders
    const currentExcludedLoaders = updates.le !== undefined ? updates.le : excludedLoaders
    
    currentStyles.forEach(s => params.append('f', `categories:${s}`))
    currentExcludedStyles.forEach(s => params.append('f', `categories!=${s}`))
    currentFeatures.forEach(f => params.append('f', `categories:${f}`))
    currentExcludedFeatures.forEach(f => params.append('f', `categories!=${f}`))
    currentPerformance.forEach(p => params.append('f', `categories:${p}`))
    currentExcludedPerformance.forEach(p => params.append('f', `categories!=${p}`))
    currentLoaders.forEach(l => params.append('g', `categories:${l}`))
    currentExcludedLoaders.forEach(l => params.append('g', `categories!=${l}`))
    
    const currentOpenSourceState = updates.os !== undefined ? updates.os : openSourceState
    if (currentOpenSourceState === 'selected') params.set('l', 'open_source:true')
    else if (currentOpenSourceState === 'excluded') params.set('l', 'open_source:false')
    
    router.push(`/shaders?${params.toString()}`)
    onFilterChange?.()
  }

  const toggleStyle = (styleId) => {
    const isSelected = selectedStyles.includes(styleId)
    const isExcluded = excludedStyles.includes(styleId)
    let newStyles = [...selectedStyles]
    let newExcludedStyles = [...excludedStyles]
    
    if (isSelected) {
      newStyles = newStyles.filter(s => s !== styleId)
    } else {
      newStyles.push(styleId)
      if (isExcluded) {
        newExcludedStyles = newExcludedStyles.filter(s => s !== styleId)
      }
    }
    
    setSelectedStyles(newStyles)
    setExcludedStyles(newExcludedStyles)
    updateFilters({ s: newStyles, se: newExcludedStyles })
  }

  const toggleStyleExclude = (styleId) => {
    const isSelected = selectedStyles.includes(styleId)
    const isExcluded = excludedStyles.includes(styleId)
    let newStyles = [...selectedStyles]
    let newExcludedStyles = [...excludedStyles]
    
    if (isExcluded) {
      newExcludedStyles = newExcludedStyles.filter(s => s !== styleId)
    } else {
      newExcludedStyles.push(styleId)
      if (isSelected) {
        newStyles = newStyles.filter(s => s !== styleId)
      }
    }
    
    setSelectedStyles(newStyles)
    setExcludedStyles(newExcludedStyles)
    updateFilters({ s: newStyles, se: newExcludedStyles })
  }

  const toggleFeature = (featureId) => {
    const isSelected = selectedFeatures.includes(featureId)
    const isExcluded = excludedFeatures.includes(featureId)
    let newFeatures = [...selectedFeatures]
    let newExcludedFeatures = [...excludedFeatures]
    
    if (isSelected) {
      newFeatures = newFeatures.filter(f => f !== featureId)
    } else {
      newFeatures.push(featureId)
      if (isExcluded) {
        newExcludedFeatures = newExcludedFeatures.filter(f => f !== featureId)
      }
    }
    
    setSelectedFeatures(newFeatures)
    setExcludedFeatures(newExcludedFeatures)
    updateFilters({ feat: newFeatures, fe: newExcludedFeatures })
  }

  const toggleFeatureExclude = (featureId) => {
    const isSelected = selectedFeatures.includes(featureId)
    const isExcluded = excludedFeatures.includes(featureId)
    let newFeatures = [...selectedFeatures]
    let newExcludedFeatures = [...excludedFeatures]
    
    if (isExcluded) {
      newExcludedFeatures = newExcludedFeatures.filter(f => f !== featureId)
    } else {
      newExcludedFeatures.push(featureId)
      if (isSelected) {
        newFeatures = newFeatures.filter(f => f !== featureId)
      }
    }
    
    setSelectedFeatures(newFeatures)
    setExcludedFeatures(newExcludedFeatures)
    updateFilters({ feat: newFeatures, fe: newExcludedFeatures })
  }

  const togglePerformance = (performanceId) => {
    const isSelected = selectedPerformance.includes(performanceId)
    const isExcluded = excludedPerformance.includes(performanceId)
    let newPerformance = [...selectedPerformance]
    let newExcludedPerformance = [...excludedPerformance]
    
    if (isSelected) {
      newPerformance = newPerformance.filter(p => p !== performanceId)
    } else {
      newPerformance.push(performanceId)
      if (isExcluded) {
        newExcludedPerformance = newExcludedPerformance.filter(p => p !== performanceId)
      }
    }
    
    setSelectedPerformance(newPerformance)
    setExcludedPerformance(newExcludedPerformance)
    updateFilters({ p: newPerformance, pe: newExcludedPerformance })
  }

  const togglePerformanceExclude = (performanceId) => {
    const isSelected = selectedPerformance.includes(performanceId)
    const isExcluded = excludedPerformance.includes(performanceId)
    let newPerformance = [...selectedPerformance]
    let newExcludedPerformance = [...excludedPerformance]
    
    if (isExcluded) {
      newExcludedPerformance = newExcludedPerformance.filter(p => p !== performanceId)
    } else {
      newExcludedPerformance.push(performanceId)
      if (isSelected) {
        newPerformance = newPerformance.filter(p => p !== performanceId)
      }
    }
    
    setSelectedPerformance(newPerformance)
    setExcludedPerformance(newExcludedPerformance)
    updateFilters({ p: newPerformance, pe: newExcludedPerformance })
  }

  const toggleLoader = (loaderId) => {
    const isSelected = selectedLoaders.includes(loaderId)
    const isExcluded = excludedLoaders.includes(loaderId)
    let newLoaders = [...selectedLoaders]
    let newExcludedLoaders = [...excludedLoaders]
    
    if (isSelected) {
      newLoaders = newLoaders.filter(l => l !== loaderId)
    } else {
      newLoaders.push(loaderId)
      if (isExcluded) {
        newExcludedLoaders = newExcludedLoaders.filter(l => l !== loaderId)
      }
    }
    
    setSelectedLoaders(newLoaders)
    setExcludedLoaders(newExcludedLoaders)
    updateFilters({ l: newLoaders, le: newExcludedLoaders })
  }

  const toggleLoaderExclude = (loaderId) => {
    const isSelected = selectedLoaders.includes(loaderId)
    const isExcluded = excludedLoaders.includes(loaderId)
    let newLoaders = [...selectedLoaders]
    let newExcludedLoaders = [...excludedLoaders]
    
    if (isExcluded) {
      newExcludedLoaders = newExcludedLoaders.filter(l => l !== loaderId)
    } else {
      newExcludedLoaders.push(loaderId)
      if (isSelected) {
        newLoaders = newLoaders.filter(l => l !== loaderId)
      }
    }
    
    setSelectedLoaders(newLoaders)
    setExcludedLoaders(newExcludedLoaders)
    updateFilters({ l: newLoaders, le: newExcludedLoaders })
  }

  return (
    <div className={isMobile ? "w-full" : "hidden lg:block w-80 flex-shrink-0"}>
      <div className="space-y-4">
        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Категории</h3>
          <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-2">
            {SHADER_STYLES.map(style => {
              const isSelected = selectedStyles.includes(style.id)
              const isExcluded = excludedStyles.includes(style.id)
              
              return (
                <div key={style.id} className="flex gap-1 items-center group">
                  <button
                    onClick={() => toggleStyle(style.id)}
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
                    <div className="h-4 w-4">{style.icon}</div>
                    <span className="truncate text-sm flex-1">{style.name}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStyleExclude(style.id)
                    }}
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
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Особенности</h3>
          <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-2">
            {SHADER_FEATURES.map(feature => {
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
                    <div className="h-4 w-4">{feature.icon}</div>
                    <span className="truncate text-sm flex-1">{feature.name}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFeatureExclude(feature.id)
                    }}
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
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Производительность</h3>
          <div className="space-y-1.5">
            {SHADER_PERFORMANCE.map(perf => {
              const isSelected = selectedPerformance.includes(perf.id)
              const isExcluded = excludedPerformance.includes(perf.id)
              
              return (
                <div key={perf.id} className="flex gap-1 items-center group">
                  <button
                    onClick={() => togglePerformance(perf.id)}
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
                    <div className="h-4 w-4">{perf.icon}</div>
                    <span className="truncate text-sm flex-1">{perf.name}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePerformanceExclude(perf.id)
                    }}
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
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Загрузчик</h3>
          <div className="space-y-1.5">
            {SHADER_LOADERS.map(loader => {
              const isSelected = selectedLoaders.includes(loader.id)
              const isExcluded = excludedLoaders.includes(loader.id)
              
              return (
                <div key={loader.id} className="flex gap-1 items-center group">
                  <button
                    onClick={() => toggleLoader(loader.id)}
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
                    <div className="h-4 w-4">{loader.icon}</div>
                    <span className="truncate text-sm flex-1">{loader.name}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 ml-auto transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
            </svg>
                  </button>
              <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLoaderExclude(loader.id)
                    }}
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

        {(selectedVersion || selectedStyles.length > 0 || excludedStyles.length > 0 || selectedFeatures.length > 0 || excludedFeatures.length > 0 || selectedPerformance.length > 0 || excludedPerformance.length > 0 || selectedLoaders.length > 0 || excludedLoaders.length > 0 || openSourceState !== 'none' || searchQuery) && (
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-3">
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedVersion('')
                setSelectedStyles([])
                setExcludedStyles([])
              setSelectedFeatures([])
                setExcludedFeatures([])
              setSelectedPerformance([])
                setExcludedPerformance([])
              setSelectedLoaders([])
                setExcludedLoaders([])
                setOpenSourceState('none')
              router.push('/shaders')
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
