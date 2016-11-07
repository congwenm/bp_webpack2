'use strict';

const webpack = require('webpack')

module.exports = {
  output: {
    // NOTE: and it will attach your bundle to a window.myClassName instance.
    library: 'myClassName',
  },
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
    })
    //NOTE: Now, across your output files, if you have any modules that get loaded 2 or more times (set by minChunks), it will bundle that into a commons.js file which you can then cache on the client side. This will result in an additional header request, sure, but you prevent the client from downloading the same libraries more than once. So there are many scenarios where this is a net gain for speed.
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
    ],
  },
}
