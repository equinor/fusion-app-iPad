const webpack = require('webpack')
require('dotenv').config({ path: './.env' })
const Dotenv = require('dotenv-webpack')

let isProduction = false
if (process.env.BUILD_MODE && process.env.BUILD_MODE === 'production') {
    isProduction = true
}
const mode = isProduction ? 'production' : 'development'

const API_URL = process.env.API_URL

console.log('--- MODE:', mode, 'API_URL:', API_URL)

module.exports = {
    mode: mode,
    ...(isProduction ? {} : { devtool: 'eval-source-map' }),
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(API_URL),
        }),
        new Dotenv(),
    ],
}
