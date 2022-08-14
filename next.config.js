/** @type {import('next').NextConfig} */

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const { PHASE_PRODUCTION_BUILD} = require('next/constants')


const withVanillaExtract = createVanillaExtractPlugin({
    identifiers: process.env.NODE_ENV === 'development' ? 'debug' : 'short',
})

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = withVanillaExtract(nextConfig)
