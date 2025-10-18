import Link from 'next/link'
import { searchMods, formatDownloads } from '@/lib/modrinth'
import { filterModsList } from '@/lib/contentFilter'
import ShaderSidebarFilters from './ShaderSidebarFilters'
import MobileMenu from './MobileMenu'
import SortDropdown from '@/app/components/SortDropdown'

export const metadata = {
  title: 'Шейдеры для Minecraft - Скачать бесплатно | ModrinthProxy',
  description: 'Скачать шейдеры для Minecraft. Iris, OptiFine, Canvas. Реалистичная графика, тени, отражения для любой версии Minecraft.',
}

export default async function ShadersPage({ searchParams }) {
  const query = searchParams.q || '';
  const version = searchParams.v || '';
  const sortBy = searchParams.sort || 'relevance';
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const fParams = Array.isArray(searchParams.f) ? searchParams.f : (searchParams.f ? [searchParams.f] : []);
  const gParams = Array.isArray(searchParams.g) ? searchParams.g : (searchParams.g ? [searchParams.g] : []);
  
  let styles = [];
  let excludedStyles = [];
  let features = [];
  let excludedFeatures = [];
  let performance = [];
  let excludedPerformance = [];
  let loaders = [];
  let excludedLoaders = [];

  const STYLE_IDS = ['cartoon', 'cursed', 'fantasy', 'realistic', 'semi-realistic', 'vanilla-like'];
  const FEATURE_IDS = ['atmosphere', 'bloom', 'colored-lighting', 'foliage', 'path-tracing', 'pbr', 'reflections', 'shadows'];
  const PERFORMANCE_IDS = ['high', 'low', 'medium', 'potato', 'screenshot'];

  fParams.forEach(param => {
    const decoded = decodeURIComponent(param);
    if (decoded.includes('categories:') || decoded.includes('categories!=')) {
      const isExcluded = decoded.includes('categories!=');
      const value = decoded.replace('categories:', '').replace('categories!=', '');
      
      if (STYLE_IDS.includes(value)) {
        if (isExcluded) excludedStyles.push(value);
        else styles.push(value);
      } else if (FEATURE_IDS.includes(value)) {
        if (isExcluded) excludedFeatures.push(value);
        else features.push(value);
      } else if (PERFORMANCE_IDS.includes(value)) {
        if (isExcluded) excludedPerformance.push(value);
        else performance.push(value);
      }
    }
  });

  gParams.forEach(param => {
    const decoded = decodeURIComponent(param);
    if (decoded.includes('categories:')) {
      const value = decoded.replace('categories:', '');
      loaders.push(value);
    } else if (decoded.includes('categories!=')) {
      const value = decoded.replace('categories!=', '');
      excludedLoaders.push(value);
    }
  });

  const lParam = searchParams.l;
  const openSourceState = lParam === 'open_source:true' ? 'selected' : lParam === 'open_source:false' ? 'excluded' : 'none';

  const facets = [['project_type:shader']];
  
  if (version) {
    facets.push([`versions:${version}`]);
  }
  
  if (styles.length > 0) {
    styles.forEach(s => facets.push([`categories:${s}`]));
  }
  
  if (features.length > 0) {
    features.forEach(f => facets.push([`categories:${f}`]));
  }
  
  if (performance.length > 0) {
    performance.forEach(p => facets.push([`categories:${p}`]));
  }
  
  if (loaders.length > 0) {
    loaders.forEach(l => facets.push([`categories:${l}`]));
  }
  
  if (openSourceState === 'selected') {
    facets.push(['open_source:true']);
  }

  let data, blockedCount = 0, blockedByProject = 0, blockedByOrganization = 0;
  try {
    data = await searchMods({ query, facets, limit, offset, index: sortBy });
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
    styles.forEach(s => params.append('f', `categories:${s}`));
    excludedStyles.forEach(s => params.append('f', `categories!=${s}`));
    features.forEach(f => params.append('f', `categories:${f}`));
    excludedFeatures.forEach(f => params.append('f', `categories!=${f}`));
    performance.forEach(p => params.append('f', `categories:${p}`));
    excludedPerformance.forEach(p => params.append('f', `categories!=${p}`));
    loaders.forEach(l => params.append('g', `categories:${l}`));
    excludedLoaders.forEach(l => params.append('g', `categories!=${l}`));
    if (openSourceState === 'selected') params.set('l', 'open_source:true');
    else if (openSourceState === 'excluded') params.set('l', 'open_source:false');
    if (sortBy !== 'relevance') params.set('sort', sortBy);
    params.set('page', newPage.toString());
    return `/shaders?${params.toString()}`;
  };

  return (
    <>
      <MobileMenu />
      <div className="flex gap-6">
        <ShaderSidebarFilters />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Minecraft шейдеры</h1>
                <p className="text-gray-400 text-sm md:text-base">
                  {data.total_hits.toLocaleString('ru-RU')} шейдеров найдено
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
              <form action="/shaders" method="GET" className="w-full md:flex-1 md:max-w-md">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Поиск шейдеров..."
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
                categoryPath="shaders"
                searchParams={searchParams}
              />
            </div>
          </div>

      {data.hits.length === 0 ? (
        <div className="text-center py-16">
          {blockedCount > 0 ? (
            <div className="max-w-2xl mx-auto">
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xl font-semibold text-red-400 mb-3">Все шейдеры на этой странице заблокированы</p>
              <p className="text-gray-400 text-sm">
                Из {data.total_hits.toLocaleString('ru-RU')} найденных шейдеров, {blockedCount} на текущей странице заблокированы по требованиям РКН
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
            <p className="text-xl text-gray-400">Шейдеры не найдены</p>
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
            {data.hits.map((shader) => (
              <Link
                key={shader.project_id}
                href={`/shader/${shader.slug}`}
                className="bg-modrinth-dark border border-gray-800 rounded-lg p-3 md:p-4 card-hover flex items-start gap-3 md:gap-4"
              >
                {shader.icon_url && (
                  <img
                    src={shader.icon_url}
                    alt={shader.title}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-lg md:text-xl font-bold">{shader.title}</h3>
                    <span className="text-xs text-gray-500">от {shader.author}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {shader.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {formatDownloads(shader.downloads)}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {formatDownloads(shader.follows)}
                    </span>
                    <div className="hidden md:flex flex-wrap gap-1">
                      {shader.categories.slice(0, 3).map((cat) => (
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
