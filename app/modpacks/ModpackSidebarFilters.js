'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MC_VERSIONS_RELEASE, MC_VERSIONS_FULL } from '@/lib/mcVersions'
import { MODPACK_LOADERS } from '@/lib/loaders'
import { CATEGORIES } from '@/lib/categories'

const MODPACK_CATEGORIES = CATEGORIES.filter(cat => 
  ['adventure', 'challenging', 'combat', 'kitchen-sink', 'lightweight', 'magic', 'multiplayer', 'optimization', 'quests', 'technology'].includes(cat.id)
)

export default function ModpackSidebarFilters({ isMobile = false, onFilterChange }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedVersion, setSelectedVersion] = useState(searchParams.get('v') || '')
  const [selectedLoaders, setSelectedLoaders] = useState([])
  const [excludedLoaders, setExcludedLoaders] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [excludedCategories, setExcludedCategories] = useState([])
  const [environment, setEnvironment] = useState(searchParams.get('e') || '')
  const [openSourceState, setOpenSourceState] = useState('none')
  const [showAllVersions, setShowAllVersions] = useState(false)
  const [versionSearch, setVersionSearch] = useState('')

  useEffect(() => {
    const parsedFilters = parseFacets()
    setSelectedLoaders(parsedFilters.loaders)
    setExcludedLoaders(parsedFilters.excludedLoaders)
    setSelectedCategories(parsedFilters.categories)
    setExcludedCategories(parsedFilters.excludedCategories)
    setOpenSourceState(parsedFilters.openSourceState)
  }, [])

  const parseFacets = () => {
    const loaders = []
    const excludedLoaders = []
    const categories = []
    const excludedCategories = []
    let openSourceState = 'none'

    const gParams = searchParams.getAll('g')
    gParams.forEach(param => {
      const decoded = decodeURIComponent(param)
      if (decoded.startsWith('categories!=')) {
        const loaderId = decoded.substring(12)
        if (!excludedLoaders.includes(loaderId)) {
          excludedLoaders.push(loaderId)
        }
      } else if (decoded.startsWith('categories:')) {
        const loaderId = decoded.substring(11)
        if (!loaders.includes(loaderId)) {
          loaders.push(loaderId)
        }
      }
    })

    const fParams = searchParams.getAll('f')
    fParams.forEach(param => {
      const decoded = decodeURIComponent(param)
      if (decoded.startsWith('categories!=')) {
        const catId = decoded.substring(12)
        if (!excludedCategories.includes(catId)) {
          excludedCategories.push(catId)
        }
      } else if (decoded.startsWith('categories:')) {
        const catId = decoded.substring(11)
        if (!categories.includes(catId)) {
          categories.push(catId)
        }
      }
    })

    const lParams = searchParams.getAll('l')
    lParams.forEach(param => {
      const decoded = decodeURIComponent(param)
      if (decoded === 'open_source:true') {
        openSourceState = 'selected'
      } else if (decoded === 'open_source!=true') {
        openSourceState = 'excluded'
      }
    })

    return { loaders, excludedLoaders, categories, excludedCategories, openSourceState }
  }

  const updateFilters = (updates) => {
    const params = new URLSearchParams()
    
    if (updates.q !== undefined) {
      if (updates.q) params.set('q', updates.q)
    } else if (searchQuery) {
      params.set('q', searchQuery)
    }
    
    if (updates.v !== undefined) {
      if (updates.v) params.set('v', updates.v)
    } else if (selectedVersion) {
      params.set('v', selectedVersion)
    }

    const finalLoaders = updates.l !== undefined ? updates.l : selectedLoaders
    const finalExcludedLoaders = updates.le !== undefined ? updates.le : excludedLoaders
    finalLoaders.forEach(loader => {
      params.append('g', `categories:${loader}`)
    })
    finalExcludedLoaders.forEach(loader => {
      params.append('g', `categories!=${loader}`)
    })

    const finalCategories = updates.c !== undefined ? updates.c : selectedCategories
    const finalExcludedCategories = updates.ce !== undefined ? updates.ce : excludedCategories
    finalCategories.forEach(cat => {
      params.append('f', `categories:${cat}`)
    })
    finalExcludedCategories.forEach(cat => {
      params.append('f', `categories!=${cat}`)
    })

    const finalEnv = updates.e !== undefined ? updates.e : environment
    if (finalEnv) {
      params.set('e', finalEnv)
    }

    const finalOpenSource = updates.os !== undefined ? updates.os : openSourceState
    if (finalOpenSource === 'selected') {
      params.append('l', 'open_source:true')
    } else if (finalOpenSource === 'excluded') {
      params.append('l', 'open_source!=true')
    }
    
    router.push(`/modpacks?${params.toString()}`)
    onFilterChange?.()
  }

  const toggleLoader = (loaderId) => {
    let newLoaders = [...selectedLoaders]
    let newExcludedLoaders = [...excludedLoaders]

    if (newLoaders.includes(loaderId)) {
      newLoaders = newLoaders.filter(l => l !== loaderId)
    } else {
      newLoaders.push(loaderId)
      newExcludedLoaders = newExcludedLoaders.filter(l => l !== loaderId)
    }

    setSelectedLoaders(newLoaders)
    setExcludedLoaders(newExcludedLoaders)
    updateFilters({ l: newLoaders, le: newExcludedLoaders })
  }

  const toggleLoaderExclude = (loaderId) => {
    let newLoaders = [...selectedLoaders]
    let newExcludedLoaders = [...excludedLoaders]

    if (newExcludedLoaders.includes(loaderId)) {
      newExcludedLoaders = newExcludedLoaders.filter(l => l !== loaderId)
    } else {
      newExcludedLoaders.push(loaderId)
      newLoaders = newLoaders.filter(l => l !== loaderId)
    }

    setSelectedLoaders(newLoaders)
    setExcludedLoaders(newExcludedLoaders)
    updateFilters({ l: newLoaders, le: newExcludedLoaders })
  }

  const toggleCategory = (categoryId) => {
    let newCategories = [...selectedCategories]
    let newExcluded = [...excludedCategories]

    if (newCategories.includes(categoryId)) {
      newCategories = newCategories.filter(c => c !== categoryId)
    } else {
      newCategories.push(categoryId)
      newExcluded = newExcluded.filter(c => c !== categoryId)
    }

    setSelectedCategories(newCategories)
    setExcludedCategories(newExcluded)
    updateFilters({ c: newCategories, ce: newExcluded })
  }

  const toggleCategoryExclude = (categoryId) => {
    let newCategories = [...selectedCategories]
    let newExcluded = [...excludedCategories]

    if (newExcluded.includes(categoryId)) {
      newExcluded = newExcluded.filter(c => c !== categoryId)
    } else {
      newExcluded.push(categoryId)
      newCategories = newCategories.filter(c => c !== categoryId)
    }

    setSelectedCategories(newCategories)
    setExcludedCategories(newExcluded)
    updateFilters({ c: newCategories, ce: newExcluded })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateFilters({ q: searchQuery })
  }

  return (
    <div className={isMobile ? "w-full" : "hidden lg:block w-80 flex-shrink-0"}>
      <div className="space-y-4">
        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Категории</h3>
          <div className="max-h-52 overflow-y-auto custom-scrollbar space-y-1.5 pr-2">
            {MODPACK_CATEGORIES.map(cat => {
              const isSelected = selectedCategories.includes(cat.id)
              const isExcluded = excludedCategories.includes(cat.id)
              
              return (
                <div key={cat.id} className="group flex gap-1 items-center">
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
                    <div className="h-4 w-4">
                      {cat.icon}
                    </div>
                    <span className="truncate text-sm flex-1">{cat.name}</span>
                    <svg 
                      className={`h-4 w-4 flex-shrink-0 transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleCategoryExclude(cat.id)}
                    title="Исключить"
                    className={`flex items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-1 text-sm font-semibold text-gray-400 transition-all hover:bg-gray-800 hover:text-red-400 active:scale-[0.96] ${
                      isExcluded ? 'opacity-100 text-red-400' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m4.9 4.9 14.2 14.2"/>
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Окружение</h3>
          <div className="space-y-1.5">
            <button
              onClick={() => {
                const newEnv = environment === 'client' ? '' : 'client'
                setEnvironment(newEnv)
                updateFilters({ e: newEnv })
              }}
              className={`w-full text-left px-2 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                environment === 'client'
                  ? 'text-white hover:brightness-125'
                  : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              style={
                environment === 'client'
                  ? { backgroundColor: 'rgba(27, 217, 106, 0.25)' }
                  : undefined
              }
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17 9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2"/>
              </svg>
              <span className="truncate text-sm flex-1">Клиент</span>
              {environment === 'client' && (
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                const newEnv = environment === 'server' ? '' : 'server'
                setEnvironment(newEnv)
                updateFilters({ e: newEnv })
              }}
              className={`w-full text-left px-2 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                environment === 'server'
                  ? 'text-white hover:brightness-125'
                  : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              style={
                environment === 'server'
                  ? { backgroundColor: 'rgba(27, 217, 106, 0.25)' }
                  : undefined
              }
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 12H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11M6 16h.01M10 16h.01"/>
              </svg>
              <span className="truncate text-sm flex-1">Сервер</span>
              {environment === 'server' && (
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
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
            {MODPACK_LOADERS.map(loader => {
              const isSelected = selectedLoaders.includes(loader.id)
              const isExcluded = excludedLoaders.includes(loader.id)
              
              return (
                <div key={loader.id} className="group flex gap-1 items-center">
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
                    <div className="h-4 w-4">
                      {loader.icon}
                    </div>
                    <span className="truncate text-sm flex-1">{loader.name}</span>
                    <svg 
                      className={`h-4 w-4 flex-shrink-0 transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleLoaderExclude(loader.id)}
                    title="Исключить"
                    className={`flex items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-1 text-sm font-semibold text-gray-400 transition-all hover:bg-gray-800 hover:text-red-400 active:scale-[0.96] ${
                      isExcluded ? 'opacity-100 text-red-400' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m4.9 4.9 14.2 14.2"/>
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
              <svg 
                className={`h-4 w-4 flex-shrink-0 transition-opacity ${
                  openSourceState === 'selected' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                viewBox="0 0 24 24"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </button>
            <button
              onClick={() => {
                const newState = openSourceState === 'excluded' ? 'none' : 'excluded'
                setOpenSourceState(newState)
                updateFilters({ os: newState })
              }}
              title="Исключить"
              className={`flex items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-1 text-sm font-semibold text-gray-400 transition-all hover:bg-gray-800 hover:text-red-400 active:scale-[0.96] ${
                openSourceState === 'excluded' ? 'opacity-100 text-red-400' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="m4.9 4.9 14.2 14.2"/>
              </svg>
            </button>
          </div>
        </div>

        {(selectedVersion || selectedLoaders.length > 0 || excludedLoaders.length > 0 || selectedCategories.length > 0 || excludedCategories.length > 0 || environment || openSourceState !== 'none' || searchQuery) && (
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-3">
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedVersion('')
                setSelectedLoaders([])
                setExcludedLoaders([])
                setSelectedCategories([])
                setExcludedCategories([])
                setEnvironment('')
                setOpenSourceState('none')
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
