import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMod, getModVersions, getTeamMembers } from '@/lib/modrinth'
import { filterModContent, filterTeamMembers, isProjectBlocked, isOrganizationBlocked } from '@/lib/contentFilter'
import ModSidebar from '@/app/components/ModSidebar'
import ContentNavigation from '@/app/components/ContentNavigation'
import ResourceHeader from '@/app/components/ResourceHeader'
import VersionsList from '@/app/components/VersionsList'

export async function generateMetadata({ params }) {
  try {
    const shader = await getMod(params.slug)
    return { title: `${shader.title} - Версии | ModrinthProxy` }
  } catch {
    return { title: 'Шейдер не найден | ModrinthProxy' }
  }
}

export default async function ShaderVersionsPage({ params, searchParams = {} }) {
  const { slug } = params;
  if (isProjectBlocked(slug)) {
    return <div className="text-center py-16"><Link href="/shaders" className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold">Вернуться</Link></div>
  }

  const initialLoader = searchParams.l || 'all'

  let shader, versions, teamMembers;
  try {
    [shader, versions, teamMembers] = await Promise.all([getMod(slug), getModVersions(slug), getTeamMembers(slug)]);
    shader = filterModContent(shader);
    teamMembers = filterTeamMembers(teamMembers);
    if (isOrganizationBlocked(shader.organization)) notFound()
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ResourceHeader resource={shader} contentType="shader" versions={versions} />
      
      <ContentNavigation slug={slug} contentType="shader" versionsCount={versions.length} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="min-w-0">
          <VersionsList versions={versions} contentType="shader" slug={slug} initialLoader={searchParams.l || 'all'} />
        </div>
        <div className="lg:sticky lg:top-4 lg:self-start">
          <ModSidebar mod={shader} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

