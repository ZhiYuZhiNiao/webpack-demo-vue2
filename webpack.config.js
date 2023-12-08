const path = require('path')
/* html-webpack-plugin 会自动将打包好的JS注入到index.html中 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader  vue 文件需要进行 vue-loader进行加载
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
/* public文件夹下得文件直接进行复制，不进行打包 */
const CopyPlugin = require('copy-webpack-plugin');  

module.exports = {
  entry: './src/main.js' /* 打包的入口文件 */,
  devtool: false, /* 不产生 sourcemap */
  /* 打包之后文件输出的位置和输出的形式 */
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname 表示当前配置文件所在电脑得绝对路径,, 然后和 dist 拼接之后形成得绝对路径
    filename: 'static/js/[name].[contenthash].js', // 打包好的 js 文件都在 dist 下面的 js 文件夹下
    clean: true
  },
  devServer: {
    static: './dist', // 可以理解为服务开在哪里, 就开在 dist 文件夹下，，也就是说当前dist文件夹下得资源都可以通过当前得服务进去访问
    client: {
      overlay: false // 关闭 webpack 在网页得 警告和错误提示得遮罩层
    },
    hot: true, // 热更新
    open: true, // 启动之后自动打开网页
    port: 9527 // 网页端口号
  },
  /* 文件引入时候得别名,, 可以省略前面得一串  xx/xx/src  用 @ 来表示 */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      // vue-style-loader 应该在 vue-loader里面就已经有了所以不要下载？,, webpack 只认识 js 和 json类文件。。所有其他类得文件处理都需要 loader 加载器进行处理之后 webpack才认识
      { test: /\.css$/i, use: ['vue-style-loader', 'css-loader'], },
      // 这些资源打包之后指定的路径,generator 里面配置的是打包之后文件的路径,  asset/resource 这是 webpack5 新出的方式
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource", generator: { filename: `static/img/[contenthash][ext]` } },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource", generator: { filename: `static/fonts/[contenthash][ext]` } }, 
      { test: /\.s[ac]ss$/i, use: ['vue-style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.vue$/, use: ['vue-loader']  }
    ]
  },
  plugins: [
    // 意思就是把public下得文件直接复制到 dist 下, 不进行打包, 同时忽略 index.html
    new CopyPlugin({patterns: [{ from: './public', to: path.resolve(__dirname, 'dist'), globOptions: { ignore: ['**/index.html']}}]}),
    /* 使用 这个html文件作为模板来生成打包之后的html文件 */
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new VueLoaderPlugin(),
    /* 打包的时候会出现进度条 */
    new webpack.ProgressPlugin(),
  ]
}