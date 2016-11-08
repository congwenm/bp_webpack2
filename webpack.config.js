'use strict';

const webpack = require('webpack')
var path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // output: {
    // NOTE: and it will attach your bundle to a window.myClassName instance.
    // library: 'myClassName',
  // },
  context: __dirname + '/src',
  entry: {
    app: ['./app.js', './app2.js'],
    home: './home.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].bundle.js",
    publicPath: '/assets'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2
    }),
    // NOTE: Now, across your output files, if you have any modules that get loaded 2 or more times (set by minChunks), it will bundle that into a commons.js file which you can then cache on the client side. This will result in an additional header request, sure, but you prevent the client from downloading the same libraries more than once. So there are many scenarios where this is a net gain for speed.

    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      allChunks: true
    })
    // extract css files
  ],
  devServer: {
    contentBase: __dirname + '/src'
  },

  //NOTE: still need this to configure es6 -> es5 transpile
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: { presets: ["es2015"] }
        }],
      },

      // Loaders for other file types can go here

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      //Then when your Javascript calls for an import on a .scss or .sass file, Webpack will do its thing.

      // {
      //   test: /\.css$/,
      //   use: [
      //     ExtractTextPlugin.extract('css'),
      //     'css-loader'
      //
      //   ]
      // }
      // separate bundle for css
    ],
  },

  resolve: {
    // We specified our source directory first, and then node_modules. So Webpack will handle resolution a little better, first looking through our source directory and then the installed Node modules, in that order (replace "src" and "node_modules" with your source and Node module directories, respectively).
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
}
