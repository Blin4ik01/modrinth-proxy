import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, getTeamMembers } from '@/lib/modrinth'
import { filterModContent, filterTeamMembers, isProjectBlocked, isOrganizationBlocked } from '@/lib/contentFilter'
import ResourceSidebar from '@/app/components/ResourceSidebar'
import ContentNavigation from '@/app/components/ContentNavigation'
import ResourceHeader from '@/app/components/ResourceHeader'
import VersionsList from '@/app/components/VersionsList'

export async function generateMetadata({ params }) {
  try {
    const plugin = await getMod(params.slug)
    return {
      title: `${plugin.title} - Версии | ModrinthProxy`,
      description: `Все версии плагина ${plugin.title}.`,
    }
  } catch {
    return {
      title: 'Плагин не найден | ModrinthProxy',
      description: 'Запрашиваемый плагин не найден',
    }
  }
}

export default async function PluginVersionsPage({ params, searchParams }) {
  const { slug } = params;
  
  if (isProjectBlocked(slug)) {
    return (
      <div className="text-center py-16 max-w-2xl mx-auto">
        <Link 
          href="/plugins"
          className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
        >
          <span>Вернуться к плагинам</span>
        </Link>
      </div>
    )
  }

  const initialLoader = searchParams.l || 'all'

  let plugin, versions, teamMembers;
  try {
    [plugin, versions, teamMembers] = await Promise.all([
      getMod(slug),
      getModVersions(slug),
      getTeamMembers(slug),
    ]);
    
    plugin = filterModContent(plugin);
    teamMembers = filterTeamMembers(teamMembers);
    
    if (isOrganizationBlocked(plugin.organization)) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ResourceHeader resource={plugin} contentType="plugin" versions={versions} />
      
      <ContentNavigation slug={slug} contentType="plugin" versionsCount={versions.length} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="min-w-0">
          <VersionsList versions={versions} contentType="plugin" slug={slug} initialLoader={initialLoader} />
        </div>
        
        <div className="lg:sticky lg:top-4 lg:self-start">
          <ResourceSidebar resource={plugin} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

