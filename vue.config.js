const path = require('path');
const fs = require('fs');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
var config = require('./src/config/config');
var proxyTable = config.proxyTable;

const resolve = dir => {
    return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/' :
    '/'

const manifestFileBase = path.join(__dirname, "public/vendor", "lib.manifest.json");
const manifestFileUi = path.join(__dirname, "public/vendor", "ui.manifest.json");
const manifestFileFrame = path.join(__dirname, "public/vendor", "frame.manifest.json");

module.exports = {
    // Project deployment base
    // By default we assume your app will be deployed at the root of a domain,
    // e.g. https://www.my-app.com/
    // If your app is deployed at a sub-path, you will need to specify that
    // sub-path here. For example, if your app is deployed at
    // https://www.foobar.com/my-app/
    // then change this to '/my-app/'
    publicPath: BASE_URL,
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,

    css: {
        loaderOptions: {
            sass: {
                // @/ 是 src/ 的别名
                data: fs.readFileSync(path.resolve(__dirname, `src/modules/spoc-h5-web/client/common/styles/variables.scss`), 'utf-8') // 公共变量文件注入
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('@public', resolve('src/modules/spoc-portal'))
            .set('@@', resolve('public'))
            .set('@client', path.resolve('src/modules/spoc-h5-web/client'))
            .set('@plugins', path.resolve('src/modules/spoc-h5-web/plugins'))
            .set('@server', path.resolve('src/modules/spoc-h5-web/server'))
            .end()
        config.module
            .rule('js')
            .include.add(/engine-template/).end()
            .include.add(/client/).end()
            .include.add(/common/).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
        // 修复HMR
        config.resolve.symlinks(true);
    },
    productionSourceMap: process.env.NODE_ENV !== 'production',
    // 合并配置
    // configureWebpack: {
    //     plugins: [
    //         new HtmlWebpackPlugin({
    //             filename: './index.html',
    //             template: './src/index.ejs',
    //             // favicon: './public/favicon.ico',
    //             title: "",
    //             inject: true
    //         }),
    //         new webpack.DllReferencePlugin({
    //             manifest: manifestFileBase
    //         }),
    //         new webpack.DllReferencePlugin({
    //             manifest: manifestFileUi
    //         }),
    //         new webpack.DllReferencePlugin({
    //             manifest: manifestFileFrame
    //         })
    //     ]
    // },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]', // 提示示compression-webpack-plugin@3.0.0的话asset改为filename
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        } else {
            // 开发环境
        }
        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: './index.html',
                template: './src/index.ejs',
                // favicon: './public/favicon.ico',
                title: "",
                inject: true
            })
        );
        config.plugins.push(
            new webpack.DllReferencePlugin({
                manifest: manifestFileBase
            })
        );
        config.plugins.push(
            new webpack.DllReferencePlugin({
                manifest: manifestFileUi
            })
        );
        config.plugins.push(
            new webpack.DllReferencePlugin({
                manifest: manifestFileFrame
            })
        );
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        compress: config.compress,
        port: config.port,
        proxy: proxyTable,
        disableHostCheck: true
    },
    pluginOptions: {
        electronBuilder: {
            removeElectronJunk: false, // True by default
            builderOptions: {
                "productName": "Hootie", //项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2019", //版权信息
                publish: {
                    "provider": "generic",
                    "url": "https://hootie.athenaca.com/download/client/",
                    "publishAutoUpdate": true
                }
            }
        }
    }
}
