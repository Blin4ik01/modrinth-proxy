import { searchMods } from '@/lib/modrinth'

export default async function sitemap() {
  const baseUrl = 'https://modrinth.black'
  
  const routes = [
    '',
    '/mods',
    '/plugins',
    '/shaders',
    '/resourcepacks',
    '/datapacks',
    '/modpacks',
    '/news',
    '/extension',
    '/bmadnco',
  ]

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  const resourceTypes = [
    { facet: 'mod', route: 'mod' },
    { facet: 'plugin', route: 'plugin' },
    { facet: 'shader', route: 'shader' },
    { facet: 'resourcepack', route: 'resourcepack' },
    { facet: 'datapack', route: 'datapack' },
    { facet: 'modpack', route: 'modpack' },
  ]

  const dynamicPages = []

  for (const type of resourceTypes) {
    try {
      const allProjects = []
      const totalToFetch = 1000
      const batchSize = 100

      for (let offset = 0; offset < totalToFetch; offset += batchSize) {
        const data = await searchMods({
          facets: [['project_type:' + type.facet]],
          limit: batchSize,
          offset: offset,
          index: 'downloads',
        })

        if (data.hits.length === 0) break

        allProjects.push(...data.hits)

        if (data.hits.length < batchSize) break
      }

      const projects = allProjects.map((project) => ({
        url: `${baseUrl}/${type.route}/${project.slug}`,
        lastModified: new Date(project.date_modified || project.date_created),
        changeFrequency: 'weekly',
        priority: 0.6,
      }))

      dynamicPages.push(...projects)
    } catch (error) {
      console.error(`Error fetching ${type.facet}:`, error)
    }
  }

  return [...staticPages, ...dynamicPages]
}

