const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log('--------------development--------------')
module.exports = {
    entry: {
        //If there are any duplicated modules between entry chunks they will be included in both bundles.
        app: './src/index.js',
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'src'),
        publicPath: '/',
        historyApiFallback: { //子页面刷新404
            rewrites: [
                { from: /^\//, to: '/index.html'}
            ]
        },
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'dist'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({title: 'template', template: './src/assets/index.html', inject: false}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.join(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            }, {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                }]
            }
        ],
    }
}
