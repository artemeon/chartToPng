/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = async env => {
    return {
        entry: {
            main: './src/main.ts'
        },
        output: {
            filename: './[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        target: 'node',
    	performance: {
            hints: false 
        },
        module: {
            rules: [
                {
                    test: /\.node$/,
                    use: 'node-loader'
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(
                                    __dirname,
                                    './tsconfig.json'
                                )
                            }
                        }
                    ],

                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            modules: [path.resolve('./node_modules')],
            extensions: ['.ts', '.js']
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true
                        }
                    },
                    parallel: true,
                    cache: true
                })
            ]
        }
    }
}
