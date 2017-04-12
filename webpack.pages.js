var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        scrollbar: __dirname + "/scrollbar/src/js/main.js",
    },
    resolve: {
        alias: {
            'scrollbar': __dirname + '/scrollbar',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({// 生成scrollbar页面
            title: 'scrollbar',
            filename: 'scrollbar/demo.html',
            chunks: ['scrollbar'],
            template: __dirname + "/src/index.ejs",
        }),
    ],
}