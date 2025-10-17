import Link from 'next/link'
import { searchMods, formatDownloads } from '@/lib/modrinth'
import { filterModsList } from '@/lib/contentFilter'
import ModpackSidebarFilters from './ModpackSidebarFilters'
import MobileMenu from './MobileMenu'

export const metadata = {
  title: 'Модпаки для Minecraft - Скачать бесплатно | ModrinthProxy',
  description: 'Скачать модпаки для Minecraft на русском языке. Fabric, Forge, NeoForge, Quilt. Тысячи готовых сборок для любой версии Minecraft.',
}

export default async function ModpacksPage({ searchParams }) {
  const query = searchParams.q || '';
  const version = searchParams.v || '';
  const environment = searchParams.e || '';
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const loaders = []
  const excludedLoaders = []
  const categories = []
  const excludedCategories = []
  let includeOpenSource = false
  let excludeOpenSource = false

  const gParams = Array.isArray(searchParams.g) ? searchParams.g : (searchParams.g ? [searchParams.g] : [])
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

  const fParams = Array.isArray(searchParams.f) ? searchParams.f : (searchParams.f ? [searchParams.f] : [])
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

  const lParams = Array.isArray(searchParams.l) ? searchParams.l : (searchParams.l ? [searchParams.l] : [])
  lParams.forEach(param => {
    const decoded = decodeURIComponent(param)
    if (decoded === 'open_source:true') {
      includeOpenSource = true
    } else if (decoded === 'open_source!=true') {
      excludeOpenSource = true
    }
  })

  const facets = [['project_type:modpack']];
  
  if (version) {
    facets.push([`versions:${version}`]);
  }
  
  if (loaders.length > 0) {
    facets.push(loaders.map(l => `categories:${l}`));
  }
  
  if (categories.length > 0) {
    facets.push(categories.map(c => `categories:${c}`));
  }
  
  if (environment === 'client') {
    facets.push(['client_side:required']);
  } else if (environment === 'server') {
    facets.push(['server_side:required']);
  }

  if (includeOpenSource) {
    facets.push(['open_source:true'])
  }

  let data, blockedCount = 0, blockedByProject = 0, blockedByOrganization = 0;
  try {
    data = await searchMods({ query, facets, limit, offset });
    const filtered = filterModsList(data.hits);
    data.hits = filtered.hits;
    blockedCount = filtered.blockedCount;
    blockedByProject = filtered.blockedByProject;
    blockedByOrganization = filtered.blockedByOrganization;
  } catch (error) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Ошибка</h1>
        <p className="text-gray-400">{error.message}</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total_hits / limit);

  const buildPageUrl = (newPage) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (version) params.set('v', version);
    if (environment) params.set('e', environment);
    
    loaders.forEach(loader => {
      params.append('g', `categories:${loader}`)
    })
    excludedLoaders.forEach(loader => {
      params.append('g', `categories!=${loader}`)
    })
    
    categories.forEach(cat => {
      params.append('f', `categories:${cat}`)
    })
    excludedCategories.forEach(cat => {
      params.append('f', `categories!=${cat}`)
    })

    if (includeOpenSource) {
      params.append('l', 'open_source:true')
    } else if (excludeOpenSource) {
      params.append('l', 'open_source!=true')
    }
    
    params.set('page', newPage.toString());
    return `/modpacks?${params.toString()}`;
  };

  return (
    <>
      <MobileMenu />
      <div className="flex gap-6">
        <ModpackSidebarFilters />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Minecraft модпаки</h1>
              <p className="text-gray-400 text-sm md:text-base">
                {data.total_hits.toLocaleString('ru-RU')} модпаков найдено
                {blockedCount > 0 && (
                  <span className="text-red-400 ml-2">
                    (из них {blockedCount} заблокировано по требованиям РКН
                    {blockedByProject > 0 && blockedByOrganization > 0 && (
                      <>: {blockedByProject} по проекту, {blockedByOrganization} по организации</>
                    )}
                    )
                  </span>
                )}
              </p>
            </div>
            <form action="/modpacks" method="GET" className="w-full md:flex-1 md:max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Поиск модпаков..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-modrinth-green transition-colors"
                />
              </div>
            </form>
          </div>

      {data.hits.length === 0 ? (
        <div className="text-center py-16">
          {blockedCount > 0 ? (
            <div className="max-w-2xl mx-auto">
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xl font-semibold text-red-400 mb-3">Все модпаки на этой странице заблокированы</p>
              <p className="text-gray-400 text-sm">
                Из {data.total_hits.toLocaleString('ru-RU')} найденных модпаков, {blockedCount} на текущей странице заблокированы по требованиям РКН
                {blockedByProject > 0 && blockedByOrganization > 0 && (
                  <> ({blockedByProject} по проекту, {blockedByOrganization} по организации)</>
                )}
                {blockedByProject > 0 && blockedByOrganization === 0 && (
                  <> (по проекту)</>
                )}
                {blockedByProject === 0 && blockedByOrganization > 0 && (
                  <> (по организации)</>
                )}
                . Попробуйте изменить параметры поиска или фильтры.
              </p>
            </div>
          ) : (
            <p className="text-xl text-gray-400">Модпаки не найдены</p>
          )}
        </div>
      ) : (
        <>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {page > 1 && (
                <Link
                  href={buildPageUrl(page - 1)}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  ← Назад
                </Link>
              )}
              
              <span className="px-4 py-2 bg-modrinth-dark border border-modrinth-green rounded-lg">
                {page} / {totalPages}
              </span>

              {page < totalPages && (
                <Link
                  href={buildPageUrl(page + 1)}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  Вперёд →
                </Link>
              )}
            </div>
          )}

          <div className="space-y-3">
            {data.hits.map((modpack) => (
              <Link
                key={modpack.project_id}
                href={`/modpack/${modpack.slug}`}
                className="bg-modrinth-dark border border-gray-800 rounded-lg p-3 md:p-4 card-hover flex items-start gap-3 md:gap-4"
              >
                {modpack.icon_url && (
                  <img
                    src={modpack.icon_url}
                    alt={modpack.title}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-lg md:text-xl font-bold">{modpack.title}</h3>
                    <span className="text-xs text-gray-500">от {modpack.author}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {modpack.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {formatDownloads(modpack.downloads)}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {formatDownloads(modpack.follows)}
                    </span>
                    <div className="hidden md:flex flex-wrap gap-1">
                      {modpack.categories.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-0.5 bg-gray-800 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {page > 1 && (
                <Link
                  href={buildPageUrl(page - 1)}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  ← Назад
                </Link>
              )}
              
              <span className="px-4 py-2 bg-modrinth-dark border border-modrinth-green rounded-lg">
                {page} / {totalPages}
              </span>

              {page < totalPages && (
                <Link
                  href={buildPageUrl(page + 1)}
                  className="px-4 py-2 bg-modrinth-dark border border-gray-700 rounded-lg hover:border-modrinth-green transition"
                >
                  Вперёд →
                </Link>
              )}
            </div>
          )}
        </>
      )}
        </div>
      </div>
    </>
  )
}
