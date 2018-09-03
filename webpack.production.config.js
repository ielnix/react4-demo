var path = require('path');
var pkg = require('./package.json')
var webpack =require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin=require('mini-css-extract-plugin');
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');

module.exports={
	entry:{
		app:path.resolve(__dirname,'app/index.jsx'),
		// 第三方依赖包单独打包
		vendor:Object.keys(pkg.dependencies)
	},
	output:{
		path:path.resolve(__dirname+'/build'),
		filename:"./js/[name].[chunkhash:8].js"
	},
	resolve:{
		extensions:['*','.js','.jsx']
	},
	module:{
		rules:[
			{
				test:/\.(js|jsx)$/,
				exclude:/node_modules/,
				use:'babel-loader'
			},
			{
			    test: /\.less$/,
			    use:[MiniCssExtractPlugin.loader,"css-loader","less-loader"]
			},
			{
			    test:/\.css$/,
			    use: [MiniCssExtractPlugin.loader,"css-loader","postcss-loader"]
			},
			{
				test:/\.(png|gif|jpg|jpeg|bmp)$/i,
				use:'url-loader?limit=5000'
			},
			{
				test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
				use:'url-loader?limit=5000&name=fonts/[name].[chunkhash:8]'
			}
		]
	},
	plugins:[
		// webpack 内置的 banner-plugin
		new webpack.BannerPlugin('Copyright by xl'),
		// html模板
		new HtmlWebpackPlugin({
			template:__dirname+'/app/index.tmpl.html'
		}),
		new MiniCssExtractPlugin({
			filename: "./css/[name].[chunkhash:8].css"
			// chunkFilename: "./css/[id].[chunkhash:8].css"
	    }),
		// 定义为生产环境，编辑React时压缩至最小
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV':JSON.stringify('production')
			}
		}),
		// 为组件分配id 通过这个插件webpack可以分析和优先考虑最多的模块，并为它们分配最小的id
		new webpack.optimize.OccurrenceOrderPlugin(),
		
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: function () {
					return [autoprefixer];
				}
			}
		})
	],
	//压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false,
                    warnings:false,
                    output: {
				        comments: false,
				     }
                }
            })
        ]
    },
	// 提供公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
            	// 公共组件
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                	minSize: 0
                },
                 //第三方组件
	            vendor: {
					test: /[\\/]node_modules[\\/]/,
	                chunks: "initial",
	                name: "vendor",
	                priority: 10,
	                enforce: true
	            }
            }
        }
    },
}

