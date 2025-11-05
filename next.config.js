const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: false,
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: '/offline.html',
  },
  cacheOnFrontEndNav: false,
  workboxOptions: {
    disableDevLogs: true,
    cleanupOutdatedCaches: true,
  },
})

/** @type {import('next').NextConfig} */
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
