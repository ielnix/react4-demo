var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/index.jsx'),
    output: {
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.less$/, exclude: /node_modules/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
            { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader!postcss-loader' },
            { test: /\.(png|gif|jpg|jpeg|bmp)$/i, loader: 'url-loader?limit=5000' },
            { test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader: 'url-loader?limit=5000' },
            { test: require.resolve("react-addons-perf"), loader: "expose-loader?Perf" }
        ]
    },
    plugins: [
        // html模板
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        // 热加载
        new webpack.HotModuleReplacementPlugin(),
        // 打开浏览器
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('development')
            }
        }),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: function () {
					return [autoprefixer];
				},
				devServer: {
					colors: true, //终端中输出结果为彩色
					historyApiFallback: true, //不跳转
					inline: true, //实时刷新
					hot:true
				}
			}
		})
    ],
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
}