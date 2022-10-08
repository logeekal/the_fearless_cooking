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
}

module.exports = withVanillaExtract(nextConfig)
