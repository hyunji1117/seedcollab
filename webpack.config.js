const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  
  // 단순화된 엔트리 (일단 단일 엔트리로)
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.[contenthash].js',
    assetModuleFilename: 'assets/[path][name][ext]',  // 경로 유지
    clean: true,
    publicPath: '/'  // 추가
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
      '@scss': path.resolve(__dirname, 'src/scss'), 
      '@js': path.resolve(__dirname, 'src/js'), 
      '@assets': path.resolve(__dirname, 'src/assets'), 
    },
    extensions: ['.js', '.jsx', '.scss', '.css']
  },

  module: {
    rules: [
      // SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/scss')]
              }
            }
          }
        ],
      },

      // 이미지 - 경로 구조 유지
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            // src/assets/ 이후의 경로를 그대로 유지
            const filepath = path.dirname(pathData.filename)
              .split(path.sep)
              .slice(1)  // 'src' 제거
              .join('/');
            return `${filepath}/[name][ext]`;
          }
        },
      },

      // 폰트
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash].css',
    }),

    // 정적 파일 복사 (이미지, 아이콘 등)
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'src/assets', 
          to: 'assets',
          noErrorOnMissing: true 
        }
      ]
    }),

    // 단일 HTML (일단 home만)
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
      },
      {
        directory: path.resolve(__dirname, 'src'),
        publicPath: '/',
        watch: true
      }
    ],
    open: true,
    port: 3000,
    hot: true,
    // 404 시 index.html로 폴백
    historyApiFallback: true,
  },
};