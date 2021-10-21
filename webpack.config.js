// Webpack uses this to work with directories
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
  
  // https://webpack.js.org/concepts/#entry
  entry: './src/js/source.js',  
  
  // https://webpack.js.org/concepts/output/
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
    filename: './dist.bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]'
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
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            }, 
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: 'asset/resource',
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
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
