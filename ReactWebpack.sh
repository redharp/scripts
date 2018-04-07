#!/bin/zsh
yarn add webpack webpack-cli react react-dom babel babel-preset-env babel-loader style-loader css-loader html-webpack-plugin babel-preset-react


BABEL=$(cat <<-END
{
  "presets": ["env", "react"]
}
END
)

WEBPACK=$(cat <<-END
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [htmlWebpackPlugin]
};
END
)
echo "$WEBPACK">>webpack.config.js
echo "$BABEL">>.babelrc