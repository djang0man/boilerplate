// libs
const path = require('path');

// Try the environment variable, otherwise use root
const VERSION = process.env.CI_COMMIT_SHA
  ? `${process.env.UI_COMMIT_DATE}-${process.env.CI_COMMIT_SHA}`
  : 'dev';
const DIST_ROOT = `${VERSION}`;
console.log('UI VERSION: ', VERSION);

const APP_NAME = process.env.APP_NAME;

const getEntryPoints = appName => {
  const entry = {};

  if (APP_NAME === 'all') {
    return entryPoints;
  }

  if (Object.keys(entryPoints).includes(appName)) {
    entry[APP_NAME] = entryPoints[APP_NAME];
    return entry;
  }

  console.log('\nERROR: APP_NAME not specified or not found\n');
  process.exit(1);
};

const entryPoints = {
  'example-app': [
    '@babel/polyfill',
    path.resolve(__dirname, '../apps/example-app/entry.js')
  ]
};

let plugins = [];

module.exports = {
  target: 'web',
  entry: getEntryPoints(APP_NAME),
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /web-server/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-transform-runtime",
              "@babel/proposal-object-rest-spread",
            ],
            presets: ["@babel/preset-env", "@babel/preset-react"],
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: [/node_modules/, /web-server/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        exclude: [/node_modules/, /web-server/],
        use: [
          {
            loader: 'file-loader',
            options: {
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: [/node_modules/, /web-server/],
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'fonts/[name].[ext]',
              }
            },
          },
        ],
      },
      {
        test: /\.(jpg|svg|png|gif)$/,
        include: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'images/[name].[ext]',
              }
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      apps: path.resolve(__dirname, '../apps'),
      // @boilerplate packages
      '@boilerplate/shared': path.resolve(__dirname, '../shared'),

      // @boilerplate apps
      '@boilerplate/example-app': path.resolve(
        __dirname,
        '../apps/example-app/src'
      ),
    },
    extensions: [ "*", ".js", ".jsx" ]
  },
  output: {
    filename: `[name].bundle.js`,
    chunkFilename: `[name].[chunkhash:16].bundle.js`,
    path: path.resolve(__dirname, `../web-server/dist/${DIST_ROOT}`),
  },
};
