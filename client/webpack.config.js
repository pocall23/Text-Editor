const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: './index.html'
      }),

      new WebpackPwaManifest({
        name: 'jate',
        short_name: 'jate',
        description: "Just Another Text Editor",
        display: 'standalone',
        background_color: '#1e1e2e',
        theme_color: '#1e1e2e',
        start_url: '/',
        publicPath:'/',
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes : [96, 128, 192, 256, 384, 512],
            destinations: path.join('assets', 'icons'),
          }
        ]

      }),
      new InjectManifest({ 
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      })

    ],

    module: {
      rules: [
        {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?s$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset.env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ]
            }
          }
        }
      ],
    },
  };
};
