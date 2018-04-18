#!/bin/zsh
###
mkdir src
mkdir src/client
touch src/App.js
yarn init -y
yarn add --dev webpack webpack-cli html-loader babel-preset-env babel-plugin-transform-class-properties babel-core babel-loader style-loader css-loader html-webpack-plugin babel-preset-react babel-polyfill 
yarn add react react-dom


HTML=$(cat <<-END
<!DOCTYPE html>
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
</html>
END
)

BABEL=$(cat <<-END
{
  "presets": ["env", "react"],
  "plugins": ["transform-async-to-generator", "transform-class-properties"]
}
END
)

WEBPACK=$(cat <<-END
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/client/App.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};

END
)
echo "$WEBPACK">>webpack.config.js
echo "$BABEL">>.babelrc
echo "$HTML">>src/index.html