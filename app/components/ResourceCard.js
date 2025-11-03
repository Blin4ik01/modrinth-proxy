import Link from 'next/link'
import { formatDownloads } from '@/lib/modrinth'
import { CATEGORIES } from '@/lib/categories'
import { LOADERS } from '@/lib/loaders'
import { RESOURCEPACK_CATEGORIES } from '@/lib/resourcepackCategories'
import { SHADER_STYLES, SHADER_FEATURES, SHADER_PERFORMANCE } from '@/lib/shaderCategories'
import RelativeTime from './RelativeTime'

export default function ResourceCard({ resource, type = 'mod' }) {
  const typeMap = {
    'mod': 'mod',
    'plugin': 'plugin',
    'shader': 'shader',
    'resourcepack': 'resourcepack',
    'datapack': 'datapack',
    'modpack': 'modpack'
  }

  const basePath = typeMap[type] || 'mod'

  const getCategoryIcon = (categoryId) => {
    const allCategories = [
      ...CATEGORIES,
      ...LOADERS,
      ...RESOURCEPACK_CATEGORIES,
      ...SHADER_STYLES,
      ...SHADER_FEATURES,
      ...SHADER_PERFORMANCE
    ]
    
    const cat = allCategories.find(c => c.id === categoryId)
    return cat ? { icon: cat.icon, name: cat.name } : null
  }

  const loaderIds = LOADERS.map(l => l.id)
  const shouldShowCategory = (catId) => {
    if (catId === type || catId === `${type}s`) return false
    
    if (catId === 'datapack') return false
    
    if (type === 'datapack' && loaderIds.includes(catId)) return false
    
    return true
  }

  const getEnvironment = (clientSide, serverSide) => {
    if (!clientSide && !serverSide) return null
    
    const client = clientSide === 'required' || clientSide === 'optional'
    const server = serverSide === 'required' || serverSide === 'optional'
    
    if (client && server) return { type: 'both', label: 'Клиент или сервер' }
    if (client) return { type: 'client', label: 'Клиент' }
    if (server) return { type: 'server', label: 'Сервер' }
    
    return null
  }

  const getEnvironmentIcon = (envType) => {
    if (envType === 'both') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10"></path>
        </svg>
      )
    }
    if (envType === 'client') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17 9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2"></path>
        </svg>
      )
    }
    if (envType === 'server') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11M6 16h.01M10 16h.01"></path>
        </svg>
      )
    }
    return null
  }

  const environment = getEnvironment(resource.client_side, resource.server_side)
  const showEnvironment = ['mod', 'plugin', 'modpack'].includes(type) && environment

  return (
    <div className="bg-modrinth-dark border border-gray-800 rounded-lg p-3 md:p-4 flex items-start gap-3 md:gap-4">
      {resource.icon_url && (
        <img
          src={resource.icon_url}
          alt={resource.title}
          className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
        />
      )}
      
      <div className="flex-1 min-w-0">
        <div className="mb-1 flex items-baseline gap-2 flex-wrap">
          <Link href={`/${basePath}/${resource.slug}`}>
            <h3 className="text-lg md:text-xl font-bold hover:text-modrinth-green transition-colors cursor-pointer">
              {resource.title}
            </h3>
          </Link>
          <span className="text-xs text-gray-500">от {resource.author}</span>
        </div>
        <p className="text-sm text-gray-400 mb-2">
          {resource.description}
        </p>
        <div className="flex flex-wrap gap-1.5 items-center">
          {showEnvironment && (
            <div className="flex items-center gap-1 px-2 py-0.5 text-gray-300">
              <div className="w-4 h-4 flex items-center justify-center">
                {getEnvironmentIcon(environment.type)}
              </div>
              <span className="text-xs font-semibold">{environment.label}</span>
            </div>
          )}
          {resource.categories && resource.categories
            .filter(shouldShowCategory)
            .slice(0, 4)
            .map((catId) => {
            const categoryData = getCategoryIcon(catId)
            if (!categoryData) {
              return (
                <span
                  key={catId}
                  className="text-xs px-2 py-0.5 bg-gray-800 rounded-full text-gray-400"
                >
                  {catId}
                </span>
              )
            }
            
            return (
              <div
                key={catId}
                className="flex items-center gap-1 px-2 py-0.5 bg-gray-800 rounded-full text-gray-400 hover:bg-gray-700 transition-colors"
                title={categoryData.name}
              >
                <div className="w-3 h-3">
                  {categoryData.icon}
                </div>
                <span className="text-xs">{categoryData.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-between items-end text-right flex-shrink-0 min-w-[110px] self-stretch">
        <div className="flex flex-col gap-2.5 items-end">
          <div className="flex items-center gap-1.5 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <p className="text-sm">
              <strong className="text-white">{formatDownloads(resource.downloads)}</strong>
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0" />
            </svg>
            <p className="text-sm">
              <strong className="text-white">{formatDownloads(resource.follows || resource.followers)}</strong>
            </p>
          </div>
        </div>
        
        {(resource.date_modified || resource.updated) && (
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            <RelativeTime dateString={resource.date_modified || resource.updated} />
          </div>
        )}
      </div>
    </div>
  )
}



