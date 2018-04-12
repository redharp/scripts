const webpack = `const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/App.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};`;

const babel = `{
  "presets": ["env", "react"],
  "plugins": ["transform-async-to-generator", "transform-class-properties"]
}`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id='app'></div>
</body>
</html>`

const devPackages = `--dev webpack webpack-cli html-loader babel-preset-env babel-plugin-transform-class-properties babel-core babel-loader style-loader css-loader html-webpack-plugin babel-preset-react babel-polyfill`;
const reactPackages = 'react react-dom';

module.exports = {
  webpack, babel, html, devPackages, reactPackages
};
