// Webpack uses this to work with directories
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
  
  // https://webpack.js.org/concepts/#entry
  entry: './src/js/source.js',  
  
  // https://webpack.js.org/concepts/output/
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './dist.bundle.js'
  },

  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      {
        // Apply rule for .js
        test: /\.js$/,
        exclude: /(node_modules)/,
        // Set loaders to transform files.
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .css files
        test: /\.css$/,
        // Set loaders to transform files.
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },    
          {
            loader: "css-loader",
          },
          { 
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            }, 
          }
        ]
      },
      {
        // Apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        // Set loaders to transform files.
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'images'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        // Set loaders to transform files.
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "dist.bundle.css"
    })
  ]
};
