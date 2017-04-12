var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 必须配合html-webpack-plugin才能生效
var merge = require('webpack-merge');// 合并webpack参数
var pages = require('./webpack.pages.js'); // 多页面参数

module.exports = merge(pages, {
    devtool: 'source-map',// 配置生成Source Maps，以便报错时能定位到具体的行列
    entry: {// 入口文件配置项
        main: __dirname + "/src/js/main.js",// js文件标识，传入HtmlWebpackPlugin的chunks参数位置，以便生成多个页面时能引用不同的js文件
        test: __dirname + "/src/js/test.js",// 测试js入口
    },
    output: {// 输出文件配置项
        path: __dirname + "/dist",// 打包后的文件存放的地方
        filename: "[name].js",// 打包后输出文件的文件名
    },
    resolve: {
        alias: {// 快速搜索目录的别称配置
            'vue$': 'vue/dist/vue.esm.js',// 默认从node_modules文件夹中寻找
            'js': __dirname + '/src/js',// __dirname-当前模块文件所在目录的完整绝对路径
            'components': __dirname + '/src/components',
            'css': __dirname + '/src/css',
            'static': __dirname + '/src/static',
        }
    },
    module: {// 在配置文件里添加JSON loader
        loaders: [{
            test: /\.json$/,
            loader: "json-loader",// webpack2.x 版本不能省略loader后缀
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({// extract-text-webpack-plugin2.x 版本写法
                fallback: 'style-loader',
                use: 'css-loader!sass-loader',
            })
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=10&name=[name].[ext]',// url-loader需要配合file-loader使用才能生效，否则读取大图片的时候会报错
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,// exclude-屏蔽不需要处理的文件 include-手动添加必须处理的文件
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        },]
    },
    plugins: [// 插件配置项
        new webpack.BannerPlugin("by vcxiaohan"),
        //new webpack.optimize.UglifyJsPlugin(),// 压缩js
        new ExtractTextPlugin("[name].css"),// 提取css样式为单独的文件
        new HtmlWebpackPlugin({// 生成主页面
            title: 'vue-plugins',// 标题
            filename: 'index.html',// 输出的html文件名
            chunks: ['main'],// 引用的js文件标识，必须要引入CommonsChunkPlugin独立出来的common文件
            template: __dirname + "/src/index.ejs",// 使用模板
        }),
        new HtmlWebpackPlugin({// 生成专供测试的页面
            title: 'test',
            filename: 'test.html',
            chunks: ['test'],
            template: __dirname + "/src/test.ejs",
        }),
    ],
    devServer: {// 本地服务配置项
        inline: true,// 实时刷新
        proxy: {// 代理(含静态文件)
            '/': {
                target: 'http://v4.faqrobot.net',
                changeOrigin: true,// 解决跨域代理
            }
        }
    }
})