// @ts-check

/**
 * @type {import('next').NextConfig}
 */

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const path = require('path')
const { withPlausibleProxy } = require('next-plausible')

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: process.env.NODE_ENV === 'development' ? 'debug' : 'short',
})

const withPlausibleCustomizations = withPlausibleProxy({
  subdirectory: 'analytics',
  customDomain: 'https://analytics.logeekal.eu',
})

if (!process.env.MF_HOST) {
  throw new Error('MF_HOST environment variable is required')
}

const remotePatterns = [
  {
    protocol: 'https',
    hostname: new URL(process.env.MF_HOST).hostname,
    pathname: '/wp-content/uploads/*',
  },
]

const domains = remotePatterns.map((i) => i.hostname)

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async rewrites() {
    const functionsRewrite =
      process.env.NODE_ENV === 'development'
        ? {
            source: '/.netlify/functions/:function',
            destination: 'http://localhost:9999/.netlify/functions/:function',
          }
        : {
            source: '/.netlify/functions/:function',
            destination: '/.netlify/functions/:function',
          }

    const rewrite = [
      {
        source: '/',
        destination: '/page/1',
      },
      {
        source: '/blog',
        destination: '/blog/page/1',
      },
      {
        ...functionsRewrite,
      },
    ]
    return rewrite
  },
}

/* eslint-disable-next-line unused-imports/no-unused-vars */
module.exports = async function (phase, { defaultConfig }) {
  return withVanillaExtract(withPlausibleCustomizations(nextConfig))
}
