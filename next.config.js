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
    ]

    return {
      beforeFiles: rewrite,
    }
  },
}

module.exports = withVanillaExtract(nextConfig)
