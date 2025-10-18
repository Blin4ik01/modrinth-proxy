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
    const pack = await getMod(params.slug)
    return {
      title: `${pack.title} - Версии | ModrinthProxy`,
    }
  } catch {
    return {
      title: 'Датапак не найден | ModrinthProxy',
    }
  }
}

export default async function DatapackVersionsPage({ params, searchParams = {} }) {
  const { slug } = params;
  
  if (isProjectBlocked(slug)) {
    return <div className="text-center py-16"><Link href="/datapacks" className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold">Вернуться</Link></div>
  }

  const initialLoader = searchParams.l || 'all'

  let pack, versions, teamMembers;
  try {
    [pack, versions, teamMembers] = await Promise.all([
      getMod(slug),
      getModVersions(slug),
      getTeamMembers(slug),
    ]);
    
    pack = filterModContent(pack);
    teamMembers = filterTeamMembers(teamMembers);
    
    if (isOrganizationBlocked(pack.organization)) {
      notFound()
    }
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ResourceHeader resource={pack} contentType="datapack" versions={versions} />
      
      <ContentNavigation slug={slug} contentType="datapack" versionsCount={versions.length} galleryCount={pack.gallery?.length || 0} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="min-w-0">
          <VersionsList versions={versions} contentType="datapack" slug={slug} initialLoader={initialLoader} />
        </div>
        
        <div className="lg:sticky lg:top-4 lg:self-start">
          <ResourceSidebar resource={pack} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

