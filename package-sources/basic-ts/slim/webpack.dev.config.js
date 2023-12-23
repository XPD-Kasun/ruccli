const path = require('path');
const webpack = require('webpack');

const config = {
       entry: './src/index.tsx',
       output: {
              path: path.resolve(__dirname, 'dist'),
              filename: 'app.js'
       },
       mode: "development",
       module: {
              rules: [
                     {
                            test: /\.tsx?$/,
                            exclude: /node_modules/,
                            use: {
                                   loader: "ts-loader"
                            }
                     },
                     {
                            test: /\.s?css$/,
                            use: [
                                   {
                                          loader: "style-loader"
                                   },
                                   {
                                          loader: "css-loader"
                                   },
                                   {
                                          loader: "sass-loader"
                                   }
                            ]
                     }
              ]
       },
       resolve: {
              extensions: ['', '.ts', '.tsx']
       },
       devServer: {
              static: [
                     {
                            directory: path.resolve(__dirname, 'static'),
                     }, {
                            directory: path.resolve(__dirname, 'dist')
                     }
              ],
              historyApiFallback: {
                     index: 'index.html'
              }

       }


};

module.exports = config;