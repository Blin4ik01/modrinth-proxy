import Link from 'next/link'
import { searchMods } from '@/lib/modrinth'
import { filterModsList } from '@/lib/contentFilter'
import DatapackSidebarFilters from './DatapackSidebarFilters'
import MobileMenu from './MobileMenu'
import SortDropdown from '@/app/components/SortDropdown'
import ResourceCard from '@/app/components/ResourceCard'
import ReloadButton from '@/app/components/ReloadButton'

export const metadata = {
  title: 'Датапаки для Minecraft - Скачать бесплатно | ModrinthProxy',
  description: 'Скачать датапаки для Minecraft. Новые механики, миры, приключения. Тысячи датапаков для любой версии Minecraft.',
}

export default async function DatapacksPage({ searchParams }) {
  const query = searchParams.q || '';
  const version = searchParams.v || '';
  const sortBy = searchParams.sort || 'relevance';
  const lParam = searchParams.l
  const openSourceState = lParam === 'open_source:true' ? 'selected' : lParam === 'open_source:false' ? 'excluded' : 'none';
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const fParams = Array.isArray(searchParams.f) ? searchParams.f : (searchParams.f ? [searchParams.f] : []);
  
  let categories = [];
  let excludedCategories = [];
  
  fParams.forEach(param => {
    const decoded = decodeURIComponent(param);
    if (decoded.includes('categories:')) {
      const value = decoded.replace('categories:', '');
      categories.push(value);
    } else if (decoded.includes('categories!=')) {
      const value = decoded.replace('categories!=', '');
      excludedCategories.push(value);
    }
  });

  const facets = [['project_type:datapack']];
  
  if (version) {
    facets.push([`versions:${version}`]);
  }
  
  if (categories.length > 0) {
    categories.forEach(c => facets.push([`categories:${c}`]));
  }
  
  if (openSourceState === 'selected') {
    facets.push(['open_source:true']);
  }

  let data = null;
  let blockedCount = 0, blockedByProject = 0, blockedByOrganization = 0;
  let error = null;
  
  try {
    data = await searchMods({ query, facets, limit, offset, index: sortBy });
    const filtered = filterModsList(data.hits);
    data.hits = filtered.hits;
    blockedCount = filtered.blockedCount;
    blockedByProject = filtered.blockedByProject;
    blockedByOrganization = filtered.blockedByOrganization;
  } catch (err) {
    console.error('Failed to load datapacks:', err);
    error = err;
  }

  const totalPages = data ? Math.ceil(data.total_hits / limit) : 0;

  const buildPageUrl = (newPage) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (version) params.set('v', version);
    categories.forEach(c => params.append('f', `categories:${c}`));
    excludedCategories.forEach(c => params.append('f', `categories!=${c}`));
    if (openSourceState === 'selected') params.set('l', 'open_source:true');
    else if (openSourceState === 'excluded') params.set('l', 'open_source:false');
    if (sortBy !== 'relevance') params.set('sort', sortBy);
    params.set('page', newPage.toString());
    return `/datapacks?${params.toString()}`;
  };

  return (
    <>
      <MobileMenu />
      <div className="flex gap-6">
        <DatapackSidebarFilters />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Minecraft датапаки</h1>
                <p className="text-gray-400 text-sm md:text-base">
                  {data ? (
                    <>
                      {data.total_hits.toLocaleString('ru-RU')} датапаков найдено
                      {blockedCount > 0 && (
                        <span className="text-red-400 ml-2">
                          (из них {blockedCount} заблокировано по требованиям РКН
                          {blockedByProject > 0 && blockedByOrganization > 0 && (
                            <>: {blockedByProject} по проекту, {blockedByOrganization} по организации</>
                          )}
                          )
                        </span>
                      )}
                    </>
                  ) : (
                    'Загрузка...'
                  )}
                </p>
              </div>
              <form action="/datapacks" method="GET" className="w-full md:flex-1 md:max-w-md">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Поиск датапаков..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-modrinth-green transition-colors"
                  />
                </div>
              </form>
            </div>
            
            <div className="flex items-center gap-2">
              <SortDropdown 
                currentSort={sortBy} 
                query={query} 
                version={version} 
                categoryPath="datapacks"
                searchParams={searchParams}
              />
            </div>
          </div>

      {error ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 mx-auto text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-white mb-2">Не удалось загрузить датапаки</h2>
            <p className="text-gray-400 mb-6">Попробуйте обновить страницу через несколько секунд</p>
            <ReloadButton />
          </div>
        </div>
      ) : data && data.hits.length === 0 ? (
        <div className="text-center py-16">
          {blockedCount > 0 ? (
            <div className="max-w-2xl mx-auto">
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xl font-semibold text-red-400 mb-3">Все датапаки на этой странице заблокированы</p>
              <p className="text-gray-400 text-sm">
                Из {data.total_hits.toLocaleString('ru-RU')} найденных датапаков, {blockedCount} на текущей странице заблокированы по требованиям РКН
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
            <p className="text-xl text-gray-400">Датапаки не найдены</p>
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
            {data.hits.map((pack) => (
              <ResourceCard key={pack.project_id} resource={pack} type="datapack" />
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


