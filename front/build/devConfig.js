const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = (env) => {
  // TODO
  const _env = env.hasOwnProperty('production') ? 'production' : 'development';
  console.log("🚀 ~ file: devConfig.js:6 ~ config ~ env", _env);

  return {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
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
          loader: 'ts-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              // options: {
              //   "presets": [
              //     ["@babel/preset-typescript"],
              //     ["@babel/preset-react"],
              //     [
              //       "@babel/preset-env",
              //       {
              //         "targets": {
              //           "edge": "17",
              //           "firefox": "60",
              //           "chrome": "67",
              //           "safari": "11.1"
              //         },
              //         "useBuiltIns": "usage",
              //         "corejs": "3.6.5"
              //       }
              //     ]
              //   ]
              // }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            // {
            //   loader:'postcss-loader',
            //   //配置参数
            //   options:{
            //     postcssOptions:{
            //       plugins:[
            //         require('autoprefixer'),
            //         require('postcss-preset-env')
            //       ]
            //     }
            //   }
            // }
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
                hmr: true, // TODO
                reloadAll: true,
              },
            },
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
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].css',
        // TODO
        // filename: devMode ? "css/[name].css" : "css/[name].[contenthash].css",
        // chunkFilename: devMode ? "css/[id].css" : "css/[id].[contenthash].css",
        // ignoreOrder: true,
      }),
      new HtmlWebpackPlugin({
          filename: "index.html", // 最终创建的文件名
          template: path.resolve(__dirname, '.', "../index.html"), // 指定模板路径
          minify: {
              collapseWhitespace: true // 去除空白
          },
          // favicon: path.resolve(__dirname, '..', 'favicon.ico'),
      }),
    ],
    devServer: {
      hot: true,
      static: path.resolve(__dirname, "../dist"),
      host: "localhost", // 可以使用手机访问
      port: 9999,
      historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
    },
  };
}

exports.default = config;