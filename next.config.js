const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const path = require('path')

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: process.env.NODE_ENV === 'development' ? 'debug' : 'short',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
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
        source: '/:slug*',
        has: [
          {
            type: 'query',
            key: 'page',
            value: '(?<pageno>.*)',
          },
        ],
        destination: '/:slug*/page/:pageno',
      },
      {
        source: '/',
        destination: '/page/1',
      },
      {
        ...functionsRewrite,
      },
    ]

    return {
      beforeFiles: rewrite,
    }
  },
}

module.exports = withVanillaExtract(nextConfig)
