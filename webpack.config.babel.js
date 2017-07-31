import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {HotModuleReplacementPlugin, } from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


let sourceMap = false;
if (process.env.SOURCEMAP === 'true') {
  sourceMap = true;
}

const wds = {
  hostname: process.env.WP_HOST || 'localhost',
  port: process.env.WP_PORT || 1234
}
const wdsPath = 'http://' + wds.hostname + ':' + wds.port;

// const publicPath = wdsPath;
const publicPath = wdsPath + '/public/';

let devtool = '';


const defaultEnv = {
  dev: true,
  production: false,
}


devtool = sourceMap ? 'source-map': '';

export default (env = defaultEnv) => ({
  devtool: 'source-map',
  entry: [
    // 'react-hot-loader/patch',
    // 'webpack-dev-server/client?http://localhost:1234',
    path.join(__dirname, './src/client.js'),
  ],
  output: {
    path: path.join(__dirname, './public/'),
    // publicPath: publicPath,
    filename: 'bundle.js',
  },
  plugins: [
    ...env.dev ? new HotModuleReplacementPlugin() : [
      new ExtractTextPlugin('[name].css'),
    ],
    new webpack.NamedModulesPlugin(),
    // new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: './src/index.html'
    // }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        // exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel'],
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react',
              ],
            }
          },
          {
            loader: 'eslint-loader',
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: env.dev ? ['style-loader', 'css-loader', 'sass-loader'] : ExtractTextPlugin.extract({
          fallbackLoader: ['style-loader'],
          loader: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   // context: 'public',
            //   name: '/[path][name].[ext]'
            // }
          }
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   // context: 'public',
            //   name: '/[path][name].[ext]'
            // }
          }
        ],
      }
    ]
  },
  // devServer: {
  //   // proxy: {
  //   //   '*': wdsPath,
  //   // },
  //   publicPath: publicPath,
  //   host: wds.hostname,
  //   port: wds.port,
  //   // hot: true,
  //   // quiet: true,
  //   noInfo: true,
  //   overlay: {
  //     errors: true,
  //   },
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // },
  resolve: {
    modules: [
      'node_modules',
      'sass',
      'src',
      // 'public'
    ],
    extensions: ['.js', '.jsx', '.json', '*'],
    // root: path.resolve('/src'),
    alias: {
      "src": path.resolve('src'),
      "components": path.resolve('src/components'),
      "common": path.resolve('src/common'),
      "service": path.resolve('src/common/service'),
      "chart": path.resolve('src/common/chart'),
      "util$": path.resolve('src/common/util')
    }
  }
});
