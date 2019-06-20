const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const notifier = require('node-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const portfinder = require('portfinder');
portfinder.basePort = process.env.PORT || 8080;

const devWebpackConfig = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src')
    },
    extensions: ['.vue', '.js', '.jsx', '.json', '.scss']
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        include: [
          path.join(__dirname, '../src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    progress: true,
    historyApiFallback: true,
    quiet: true,
    overlay: {
      errors: true
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanPlugin(['./../dist/*'], { allowExternal: true }),
    new HTMLPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = new Promise((resolve, reject) => {
  // portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here http://localhost:${port}`],
        },
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            return;
          }
          const error = errors[0];
          notifier.notify({
            title: '编译失败（build err）',
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            icon: path.join(__dirname, './error_icon.png')
          });
        }
      }));
      resolve(devWebpackConfig);
    }
  });
});
