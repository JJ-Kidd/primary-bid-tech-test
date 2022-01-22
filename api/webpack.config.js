const path = require('path')
const Dotenv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new NodemonPlugin(),
    new Dotenv()
  ]
}