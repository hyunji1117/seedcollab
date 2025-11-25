const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 페이지 목록 정의
const pages = ['home', 'adopt', 'auth', 'sub'];

module.exports = {
  mode: 'development',
  
  // 멀티 엔트리 포인트 설정
  entry: pages.reduce((entries, page) => {
    entries[page] = [
      // 공통 엔트리
      './src/index.js', 
      // 페이지별 엔트리
      `./src/js/pages/${page}.js` 
    ];
    return entries;
  }, {
    // 메인 엔트리
    main: './src/index.js'  
  }),

  output: {
    path: path.resolve(__dirname, 'dist'),
    // [name]으로 변경
    filename: 'js/[name].[contenthash].js',  
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), 
      '@scss': path.resolve(__dirname, 'src/scss'), 
      '@js': path.resolve(__dirname, 'src/js'), 
      '@assets': path.resolve(__dirname, 'src/assets'), 
    },
    // 확장자 자동 해결
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

      // 이미지
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
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

    // CSS 파일 추출 플러그인
    new MiniCssExtractPlugin({
      // [name]으로 변경
      filename: 'css/[name].[contenthash].css',  
    }),

    // 각 페이지별 HtmlWebpackPlugin 자동 생성
    ...pages.map(page => 
      new HtmlWebpackPlugin({
        template: `./src/pages/${page}/index.html`,
        filename: `${page}.html`,
        chunks: ['main', page], 
        inject: 'body',
      })
    ),

    // 메인 index.html (홈을 기본으로)
    new HtmlWebpackPlugin({
      template: './src/pages/home/index.html',
      filename: 'index.html',
      chunks: ['main', 'home'],
      inject: 'body',
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
    port: 3000,
    hot: true, 
     // 파일 변경 감지
    watchFiles: ['src/**/*'], 
  },
};