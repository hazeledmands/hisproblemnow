const fs = require('fs');
const path = require('path');

const babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), { encoding: 'utf-8' }));

module.exports = {
  entry: path.join(__dirname, 'src', 'components', 'App', 'index'),
  output: {
    filename: 'App.js',
    path: path.join(__dirname, 'build'),
    libraryTarget: 'commonjs2',
  },
  node: {
    __filename: true,
    __dirname: true,
    console: false,
    process: false,
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
        loader: 'css-loader/locals?modules&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
