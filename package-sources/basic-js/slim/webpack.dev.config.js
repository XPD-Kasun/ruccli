const path = require('path');
const webpack = require('webpack');

const config = {
       entry: './src/index.js',
       output: {
              path: path.resolve(__dirname, 'dist'),
              filename: 'app.js'
       },
       mode: "development",
       module: {
              rules: [
                     {
                            test: /\.js[x]?/,
                            exclude: /node_modules/,
                            use: {
                                   loader: "babel-loader",
                                   options: {
                                          presets: [
                                                 [
                                                        "@babel/preset-react",
                                                        {
                                                               development: true,
                                                               runtime: 'automatic' 
                                                        }
                                                 ],
                                                 "@babel/preset-env"
                                          ]
                                   }
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
       plugins: [
              new webpack.ProvidePlugin({
                     "React": "react"
              })

       ],
       resolve: {
              extensions: ['', '.js', '.jsx']
       },
       devServer: {
              static: [
                     {
                            directory: path.resolve(__dirname, 'public'),
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