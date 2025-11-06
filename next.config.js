const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: false,
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: '/offline.html',
  },
  cacheOnFrontEndNav: false,
  buildExcludes: [
    /\/_next\/static\/.*/i,
    /\/_next\/data\/.*/i,
  ],
  workboxOptions: {
    disableDevLogs: true,
    cleanupOutdatedCaches: true,
    navigateFallback: null,
    navigateFallbackDenylist: [
      /\/_next\/static\/.*/i,
      /\/_next\/data\/.*/i,
      /\/_next\/.*\.js$/i,
      /\/_next\/.*\.css$/i,
    ],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/cdn\.modrinth\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'modrinth-cdn',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 7,
          },
        },
      },
      {
        urlPattern: /\/_next\/static\/.*/i,
        handler: 'NetworkOnly',
        options: {
          cacheName: 'next-static',
          plugins: [
            {
              handlerDidError: async () => {
                return Response.error();
              },
            },
          ],
        },
      },
      {
        urlPattern: /\/_next\/data\/.*/i,
        handler: 'NetworkOnly',
        options: {
          cacheName: 'next-data',
          plugins: [
            {
              handlerDidError: async () => {
                return Response.error();
              },
            },
          ],
        },
      },
    ],
  },
})

const nextConfig = {
  images: {
    domains: ['cdn.modrinth.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    staticPageGenerationTimeout: 300,
  },
  staticPageGenerationTimeout: 300,
}

module.exports = withPWA(nextConfig)
