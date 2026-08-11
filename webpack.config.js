const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    module: {

        rules: [
            {
                test: /\.module\.css$/i,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /\.module\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.(js|jsx)$/i,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ]
};