var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        scrollbar: __dirname + "/scrollbar/src/js/main.js",
        h5crop: __dirname + "/h5crop/src/js/main.js",
    },
    resolve: {
        alias: {
            'scrollbar': __dirname + '/scrollbar',
            'h5crop': __dirname + '/h5crop',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({// 生成 scrollbar 页面
            title: 'scrollbar',
            filename: 'scrollbar/demo.html',
            chunks: ['scrollbar'],
            template: __dirname + "/src/index.ejs",
        }),
        new HtmlWebpackPlugin({// 生成 h5crop 页面
            title: 'h5crop',
            filename: 'h5crop/demo.html',
            chunks: ['h5crop'],
            template: __dirname + "/src/index.ejs",
        }),
    ],
}