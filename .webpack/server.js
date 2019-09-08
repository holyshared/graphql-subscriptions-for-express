const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    target: 'node',
    mode: 'development',
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    entry: {
      server: path.resolve(__dirname, '../src/server/index.ts')
    },
    output: {
      path: path.resolve(__dirname, '../')
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, '../tsconfig.server.json')
            }
          }
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.MODE': JSON.stringify('server')
      }),
      new webpack.SourceMapDevToolPlugin()
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    stats: 'errors-only'
  }
];
