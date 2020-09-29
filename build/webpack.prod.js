// libs
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const dotenv = require('dotenv').config({path: __dirname + '/../.env'});

// configs
const common = require('./webpack.common.js');

const ASSET_PATH = process.env.ASSET_PATH;
const VERSION = process.env.CI_COMMIT_SHA
  ? `${process.env.UI_COMMIT_DATE}-${process.env.CI_COMMIT_SHA}`
  : 'dev';

const parsedDotenv = JSON.stringify(Object.assign(dotenv.parsed, {
  NODE_ENV: 'production',
  ASSET_PATH: ASSET_PATH,
}));

const plugins = [
    new webpack.DefinePlugin({
    'process.env': parsedDotenv,
  }),
];

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins,
});
