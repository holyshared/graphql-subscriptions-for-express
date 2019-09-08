const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      bundle: path.resolve(__dirname, '../src/client/index.ts')
    },
    output: {
      path: path.resolve(__dirname, '../public/js')
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, '../tsconfig.client.json')
            }
          }
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.MODE': JSON.stringify('client')
      }),
      new webpack.SourceMapDevToolPlugin()
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    stats: 'errors-only'
  }
];
