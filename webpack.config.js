const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 모든 HTML 페이지 자동 탐색 함수
function findHtmlFiles(dir, basePath = '') {
  const pages = [];
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 하위 디렉토리 재귀 탐색
      pages.push(...findHtmlFiles(fullPath, path.join(basePath, file)));
    } else if (file.endsWith('.html')) {
      // HTML 파일 발견 시 추가
      const name = path.join(basePath, file.replace('.html', ''));
      pages.push({
        name: name,
        path: fullPath,
        // home/index.html은 루트로, 나머지는 원래 경로 유지
        outputPath: name === 'home/index' ? 'index.html' : `${name}.html`
      });
    }
  });
  
  return pages;
}

// src/pages 디렉토리에서 모든 HTML 파일 탐색
const pagesDir = path.resolve(__dirname, 'src/pages');
const htmlPages = findHtmlFiles(pagesDir);

console.log('Found pages:', htmlPages.map(p => p.outputPath));

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

    // 자동으로 발견된 모든 HTML 페이지에 대해 HtmlWebpackPlugin 생성
    ...htmlPages.map(page => 
      new HtmlWebpackPlugin({
        template: page.path,
        filename: page.outputPath,
        inject: 'body',
        // 페이지별 메타 데이터 (선택사항)
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        // 캐시 무효화를 위한 해시 추가
        hash: true,
      })
    ),
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
    historyApiFallback: {
      rewrites: [
        // 특정 경로 리라이트 규칙 (필요시 추가)
        { from: /^\/sub\//, to: '/sub/notice-list.html' },
      ]
    },
    // 모든 페이지 변경 감지
    watchFiles: ['src/**/*.html', 'src/**/*.scss', 'src/**/*.js'],
  },
};