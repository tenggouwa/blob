const path = require('path');
const os = require('node:os');
const webpack = require("webpack");
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require('copy-webpack-plugin');
// const ConsolePlugin = require('../src/webpack/consolePlugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = (env) => {
  // TODO
  const devMode = !env.hasOwnProperty('production');
  

  return {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: devMode ? "js/[name].js" : "js/[name].[contenthash].js",
      chunkFilename: devMode ? "js/[name].js" : "js/[id].[contenthash].js",
      path: path.resolve(__dirname, '../dist'),
      clean: true,
    },
    // TODO
    devtool: 'eval-cheap-module-source-map',
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "../src"),
        // pages: path.resolve(__dirname, "../src/pages"),
        // router: path.resolve(__dirname, "../src/router")
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "../src"),
          use: [
            // {
            //   loader: path.resolve(__dirname, '../src/webpack/consoleLoader.js')
            // },
            { loader: 'ts-loader' }
          ]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "thread-loader",
              options: {
                workers: os.cpus().length - 1,
                workerParallelJobs: 50,
                workerNodeArgs: ['--max-old-space-size=1024'],
                // 闲置时定时删除 worker
                poolTimeout: 2000,
                poolParallelJobs: 100,
                name: "babel-pool"
              },
            },
            {
              loader: "babel-loader",
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                esModule: false,
              },
            },
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)/,
          use: {
            loader: "url-loader",
            options: {
              outputPath: "./images/", // 图片输出的路径
              limit: 10 * 1024
            }
          }
        },
        {
          test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
          type: "asset", // type选择asset
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 小于10kb转base64位
            }
          },
          generator:{ 
            filename:'fonts/[name][ext]', // 文件输出目录和命名
          },
        },
        {
          test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
          type: "asset", // type选择asset
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 小于10kb转base64位
            }
          },
          generator:{ 
            filename:'media/[name][ext]', // 文件输出目录和命名
          },
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? "css/[name].css" : "css/[name].[contenthash].css",
        chunkFilename: devMode ? "css/[id].css" : "css/[id].[contenthash].css",
      }),
      // TODO
      new webpack.HotModuleReplacementPlugin(),
      // new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html", // 最终创建的文件名
        template: path.resolve(__dirname, '.', "../index.html"), // 指定模板路径
        minify: {
            collapseWhitespace: true // 去除空白
        },
        // favicon: path.resolve(__dirname, '..', 'favicon.ico'),
      }),
      new WebpackBar({
        color: '#c5dcee',
        basic: false,
        profile: false,
      }),
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, '../public'), // 复制public下文件
      //       to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
      //       filter: source => {
      //         return !source.includes('index.html') // 忽略index.html
      //       }
      //     },
      //   ],
      // }),
      // new ConsolePlugin({
      //   output: 'console.md'
      // })
    ],
    devServer: {
      hot: true,
      static: path.resolve(__dirname, "../dist"),
      host: "localhost", // 可以使用手机访问
      port: 9999,
      compress: true,
      open: true, // TODO
      historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
      client: {
        logging: 'error'
      },
      proxy: {
        '/api': {
          target: 'http://localhost:5268/'
        }
      }
    },
    optimization: {
      runtimeChunk: 'single', //会将Webpack在浏览器端运行时需要的代码单独抽离到一个文件
      splitChunks: {
        cacheGroups: {
          commons: {
            //产生一个Chunk
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0 // This is example is too small to create commons chunks
          },
          vendor: {
            //产生一个Chunk
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    cache: {
      type: 'filesystem',
      compression: 'gzip',
    },
  };
}

exports.default = config;