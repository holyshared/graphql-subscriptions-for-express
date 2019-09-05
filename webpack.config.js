const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      bundle: path.resolve('./src/client/index.ts')
    },
    output: {
      path: path.resolve(__dirname, 'public/js')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader"
          }
        },
      ],
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    stats: 'errors-only'
  }
];
