const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), { encoding: 'utf-8' }));
const env = process.env.NODE_ENV;
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env),
    },
  }),
  new ExtractTextPlugin('bundle.css', {
    allChunks: true,
  }),
];

if (env === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  plugins.push(new webpack.SourceMapDevToolPlugin({
    moduleFilenameTemplate: 'file://[absolute-resource-path]',
    filename: 'bundle.js.map',
    noSources: true,
  }));
}

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build', 'public'),
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: babelConfig,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins,
};
