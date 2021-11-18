const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (!isDev) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

const filename = (ext) => isDev ? `[name].bundle.${ext}` : `[contenthash].bundle.${ext}`

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader']

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = preset => {
    const opt = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }

    if (preset) {
        opt.presets.push(preset)
    }

    return opt;
}

const jsLoaders = () => {
    const loaders =[{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev){
        loaders.push('eslint-loader')
    }

    return loaders;
}

const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: './index.html', // html template for the app
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(), // clean dist folder
        // new CopyWebpackPlugin([
        //     {
        //         from: '',
        //         to: ''
        //     }
        // ])
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]

    return base;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        first: ['@babel/polyfill', './first.js'],
        second: './second.ts'
    }, // entry point of the app
    output: {
        filename: filename('js'), // name of the output file
        path: path.resolve(__dirname, 'dist'), // path to the output file
    },
    resolve: {
        extensions: ['.js', '.json'], // extensions that could be omitted in import
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    optimization: optimization(),
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            }
        ]
    },
    devServer: {
        port: 4200,
        hot: isDev // hot reload
    },
    devtool: isDev ? 'source-map' : 'nosources-source-map'
}