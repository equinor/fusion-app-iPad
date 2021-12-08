const webpack = require('webpack')
require('dotenv').config({ path: './.env' })
const Dotenv = require('dotenv-webpack')

let isProduction = false
if (process.env.BUILD_MODE && process.env.BUILD_MODE === 'production') {
    isProduction = true
}
const mode = isProduction ? 'production' : 'development'

const API_URL = process.env.API_URL
const AD_CLIENT_ID = process.env.AD_CLIENT_ID || 'd83c2116-0a79-4a0d-8276-d51cdb4a6fd6'
const AD_TENANT_ID = process.env.AD_TENANT_ID || '3aa4a235-b6e2-48d5-9195-7fcf05b459b0'
const FUSION_CONTEXT_KEY = '74b1613f-f22a-451b-a5c3-1c9391e91e68'

console.log('--- MODE:', mode, 'API_URL:', API_URL)

module.exports = {
    mode: mode,
    ...(isProduction ? {} : { devtool: 'eval-source-map' }),
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(API_URL),
            AD_CLIENT_ID: JSON.stringify(AD_CLIENT_ID),
            AD_TENANT_ID: JSON.stringify(AD_TENANT_ID),
            FUSION_CONTEXT_KEY: JSON.stringify(FUSION_CONTEXT_KEY),
        }),
        new Dotenv(),
    ],
}
