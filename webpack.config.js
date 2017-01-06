var webpack = require('webpack'); 
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/app.js',
    output: {
        path: __dirname + '/bin',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            //{ test: /\.(js|jsx)$/, exclude: __dirname + '/node_modules/', loaders: ['babel-loader'] },
            { test: /\.css$/, loader: 'style!css?modules!postcss' },
            { test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new webpack.BannerPlugin("Copyright Easy Taxi Peru SAC"),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmp.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: __dirname + "/app/",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};