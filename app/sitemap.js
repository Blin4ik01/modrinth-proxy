export default function sitemap() {
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

  return staticPages
}

