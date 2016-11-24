var fs = require('fs');
var path = require('path');

var babelConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '.babelrc'), {encoding: 'utf-8'})
);

module.exports = {
  entry: path.join(__dirname, 'src', 'client', 'index'),
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
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
      }
    ]
  }
};
