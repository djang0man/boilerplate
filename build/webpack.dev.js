// libs
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const PrettierPlugin = require("prettier-webpack-plugin");
const dotenv = require('dotenv').config({path: __dirname + '/../.env'});

// configs
const common = require('./webpack.common.js');

const REDUX_DEVTOOLS = process.env.REDUX_DEVTOOLS;
const IS_PRETTIER = process.env.IS_PRETTIER;

const parsedDotenv = JSON.stringify(Object.assign(dotenv.parsed, {
  NODE_ENV: 'development',
  REDUX_DEVTOOLS: REDUX_DEVTOOLS,
}));

console.log(parsedDotenv);

const plugins = [
  new webpack.DefinePlugin({
    'process.env': parsedDotenv,
  }),
];

if (IS_PRETTIER) {
  plugins.push(
    new PrettierPlugin(),
  );
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: plugins,
  optimization: {
    minimize: false,
  },
});
