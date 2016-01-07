const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const Target = process.env.npm_lifecycle_event;
const Paths = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};
process.env.BABEL_ENV = Target;

const common = {
  entry: Paths.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: Paths.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: Paths.app
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'node_modules/html-webpack-template/index.html',
      title: 'MyClient',
      appMountId: 'app'
    })
  ]
};

if (Target === 'start' || !Target) {
  module.exports = merge(common, {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map'
  });
}

if (Target === 'build') {
  module.exports = merge(common, {});
}
