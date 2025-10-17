import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, formatDownloads } from '@/lib/modrinth'
import { isProjectBlocked, isOrganizationBlocked, filterGalleryImages } from '@/lib/contentFilter'
import ContentNavigation from '@/app/components/ContentNavigation'
import ModSidebar from '@/app/components/ModSidebar'
import DownloadModal from '@/app/components/DownloadModal'
import MobileDownloadButton from '@/app/components/MobileDownloadButton'
import GalleryGrid from '@/app/components/GalleryGrid'
import { CATEGORIES } from '@/lib/categories'

export async function generateMetadata({ params }) {
  try {
    const mod = await getMod(params.slug)
    return {
      title: `${mod.title} - Галерея | ModrinthProxy`,
      description: `Просмотрите галерею изображений для ${mod.title}`,
    }
  } catch {
    return {
      title: 'Галерея не найдена',
    }
  }
}

export default async function ModGalleryPage({ params }) {
  const { slug } = params
  
  if (isProjectBlocked(slug)) {
    return (
      <div className="text-center py-16 max-w-2xl mx-auto">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-3xl font-bold text-red-500 mb-4">Доступ ограничен</h1>
          <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-6 mb-6 text-left">
            <p className="text-gray-300 mb-3">
              Данный проект недоступен в соответствии с региональными ограничениями и требованиями Роскомнадзора.
            </p>
          </div>
        </div>
        <Link 
          href="/mods"
          className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
        >
          <span>Вернуться к модам</span>
        </Link>
      </div>
    )
  }

  let mod, versions
  try {
    [mod, versions] = await Promise.all([
      getMod(slug),
      getModVersions(slug),
    ])
    
    if (isOrganizationBlocked(mod.organization)) {
      return (
        <div className="text-center py-16 max-w-2xl mx-auto">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-3xl font-bold text-red-500 mb-4">Доступ ограничен</h1>
            <div className="bg-modrinth-dark border border-gray-800 rounded-xl p-6 mb-6 text-left">
              <p className="text-gray-300 mb-3">
                Данный проект недоступен в соответствии с региональными ограничениями и требованиями Роскомнадзора.
              </p>
            </div>
          </div>
          <Link 
            href="/mods"
            className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
          >
            <span>Вернуться к модам</span>
          </Link>
        </div>
      )
    }
  } catch (error) {
    notFound()
  }

  const gallery = mod.gallery || []
  const filteredGallery = filterGalleryImages(gallery)
  const sortedGallery = [...filteredGallery].sort((a, b) => a.ordering - b.ordering)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 md:mb-6 flex items-center gap-2 text-sm flex-wrap">
        <Link 
          href="/mods" 
          className="text-gray-400 hover:text-modrinth-green transition-colors duration-200 font-medium"
        >
          Моды
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-white font-semibold truncate">{mod.title}</span>
      </div>

      <div className="border-b pb-4 md:pb-6 mb-6 md:mb-8" style={{ borderBottomColor: '#34363c' }}>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">
          <div className="flex gap-3 md:gap-4 flex-1">
            {mod.icon_url && (
              <img
                src={mod.icon_url}
                alt={mod.title}
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{mod.title}</h1>
              <p className="text-gray-300 mb-3 text-sm md:text-base">{mod.description}</p>
              
              <div className="hidden lg:flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(mod.downloads)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(mod.followers)}</span>
                </div>
                <div className="hidden sm:flex flex-wrap gap-1.5">
                  {mod.categories.slice(0, 4).map((catId) => {
                    const category = CATEGORIES.find(c => c.id === catId)
                    if (!category) return null
                    
                    return (
                      <Link
                        key={catId}
                        href={`/mods?f=categories:${catId}`}
                        className="px-2 py-1 text-xs font-semibold rounded-lg hover:brightness-110 transition-all flex items-center gap-1.5"
                        style={{ backgroundColor: '#34363c', color: '#80878f' }}
                      >
                        <div className="h-3.5 w-3.5 flex-shrink-0">{category.icon}</div>
                        <span>{category.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:flex lg:items-center">
            <div className="hidden lg:block w-full lg:w-auto">
              <DownloadModal mod={mod} versions={versions} contentType="mods" />
            </div>
            
            <div className="lg:hidden flex items-center gap-3 justify-between">
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(mod.downloads)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="font-semibold text-white">{formatDownloads(mod.followers)}</span>
                </div>
              </div>
              
              <MobileDownloadButton />
            </div>
          </div>
        </div>
      </div>

      <ContentNavigation slug={slug} contentType="mod" versionsCount={versions.length} galleryCount={gallery.length} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="min-w-0">
          <GalleryGrid gallery={sortedGallery} />
        </div>
        
        <div className="lg:sticky lg:top-4 lg:self-start">
          <ModSidebar mod={mod} teamMembers={[]} />
        </div>
      </div>
    </div>
  )
}

