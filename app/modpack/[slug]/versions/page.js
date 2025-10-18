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
    const modpack = await getMod(params.slug)
    return { title: `${modpack.title} - Версии | ModrinthProxy` }
  } catch {
    return { title: 'Модпак не найден | ModrinthProxy' }
  }
}

export default async function ModpackVersionsPage({ params, searchParams }) {
  const { slug } = params;
  if (isProjectBlocked(slug)) {
    return <div className="text-center py-16"><Link href="/modpacks" className="inline-flex items-center gap-2 bg-modrinth-green text-black px-6 py-3 rounded-lg font-semibold">Вернуться</Link></div>
  }

  const initialLoader = searchParams.l || 'all'

  let modpack, versions, teamMembers;
  try {
    [modpack, versions, teamMembers] = await Promise.all([getMod(slug), getModVersions(slug), getTeamMembers(slug)]);
    modpack = filterModContent(modpack);
    teamMembers = filterTeamMembers(teamMembers);
    if (isOrganizationBlocked(modpack.organization)) notFound()
  } catch (error) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ResourceHeader resource={modpack} contentType="modpack" versions={versions} />
      
      <ContentNavigation slug={slug} contentType="modpack" versionsCount={versions.length} galleryCount={modpack.gallery?.length || 0} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <VersionsList versions={versions} contentType="modpack" slug={slug} initialLoader={initialLoader} />
        </div>

        <div className="lg:sticky lg:top-4 lg:self-start">
          <ResourceSidebar resource={modpack} teamMembers={teamMembers} />
        </div>
      </div>
    </div>
  )
}

