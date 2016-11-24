var fs = require('fs');
var path = require('path');

var babelConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '.babelrc'), {encoding: 'utf-8'})
);

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'index.js'),
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build', 'public'),
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: babelConfig,
      }
    ]
  }
};
