const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Copy = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const { IgnorePlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin')
const packageFile = require('./package.json')

const version = packageFile.version || Date.now().toString()
const drawBuildPath = path.join(__dirname, 'dist/web')
const nodeBuildPath = path.join(__dirname, 'dist/node')
const drawPath = path.resolve(__dirname, 'node_modules/@olympeio/draw')

const versionReplaceFunction = function (versionDir, version) {
  return new ReplaceInFileWebpackPlugin([
    {
      dir: versionDir,
      files: ['version.json'],
      rules: [
        {
          search: /(?:\"version)(?:\"\s?:\s?\")(.*)(?:\")/,
          replace: `"version": "${version}"`
        }
      ]
    }
  ])
}

const common = {
  mode: 'production',
  resolve: {
    extensions: ['.js', 'jsx', '.tsx', '.ts'],
    alias: {
      olympe: drawPath,
      '@olympeio': path.resolve(__dirname, 'node_modules/@olympeio'),
      '@olympeio-extensions': path.resolve(
        __dirname,
        'node_modules/@olympeio-extensions'
      ),
      'chart.js': path.resolve(__dirname, 'node_modules/chart.js')
    }
  },
  module: {
    rules: [
      { test: /\.(tsx?)$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.js$/, enforce: 'pre', use: 'source-map-loader' },
      { test: /\.js$/, enforce: 'pre', use: 'webpack-import-glob-loader' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/react'] }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  ignoreWarnings: [
    { module: /\@zxing/ },
    { message: /Empty results for "import.*/ },
    { message: /Comparison with NaN.*/ },
    { message: /Suspicious use of the "!" operator.*/ }
  ],
  performance: {
    hints: false // avoid to display warnings related to the js assets size.
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
        terserOptions: {}
      })
    ]
  }
}

const draw = {
  name: 'draw',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: drawBuildPath,
    globalObject: 'this'
  },
  devServer: {
    compress: true,
    port: 8888,
    static: {
      directory: drawBuildPath
    },
    devMiddleware: {
      writeToDisk: true
    }
  },
  plugins: [
    new Copy({
      patterns: [
        { from: 'res' },
        { from: drawPath + '/images', to: 'images' },
        { from: drawPath + '/fonts', to: 'fonts' },
        { from: drawPath + '/css', to: 'css' },
        { from: drawPath + '/doc', to: 'doc' },
        { from: drawPath + '/version.json', to: 'version.json' },
        { from: drawPath + '/maintenance', to: 'maintenance' }
      ]
    }),
    new ReplaceInFileWebpackPlugin([
      {
        dir: drawBuildPath,
        files: ['index.html'],
        rules: [
          { search: '$VERSION', replace: version },
          { search: '$VERSION', replace: version }
        ]
      }
    ]),
    versionReplaceFunction(drawBuildPath, version)
  ]
}

const node = {
  name: 'node',
  entry: './src/main-node.js',
  target: 'node',
  resolve: {
    alias: {
      olympe: path.resolve(__dirname, 'node_modules/@olympeio/runtime-node')
    }
  },
  output: {
    filename: 'main.js',
    path: nodeBuildPath,
    globalObject: 'this'
  },
  plugins: [
    new Copy({
      patterns: [
        { from: 'res/oConfigNode.json', to: 'oConfig.json' },
        { from: drawPath + '/version.json', to: 'version.json' }
      ]
    }),
    versionReplaceFunction(nodeBuildPath, version),
    new IgnorePlugin({
      resourceRegExp:
        /^(mssql*|mariasql|.oracle|oracledb|mysql|mysql2|mssql.|tedious|sqlite3|better-sqlite3|pg-query-stream|pg-native|node-pre-gyp)$/
    })
  ]
}

module.exports = [merge(common, draw), merge(common, node)]
