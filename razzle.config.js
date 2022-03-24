const { ReactLoadablePlugin } = require('react-loadable/webpack')
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('razzle/config/paths')
const path = require('path')

module.exports = {
  plugins: [
    {
      name: 'less',
      options: {
        css: {
          dev: {
            importLoaders: 1,
            modules: { auto: true },
            onlyLocals: true,
          },
          prod: {
            importLoaders: 1,
            modules: { auto: true },
            onlyLocals: true
          },
        }
      }
    },
    {
      name: 'workbox'
    },
    {
      name: 'scss'
    },
    {
      name: 'serviceworker',
      options: {
        autoUpdate: true
      }
    }
    // {
    //   name: 'antd'
    // }
  ],
  modify: (config, option, webpack) => {
    if (process.env.ANALYZE) {
      config.plugins.push(new WebpackBundleSizeAnalyzerPlugin('stats.txt'))
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      }))
    }
    if (option.target === 'web') {
      // config.output.filename = option.dev
      //   ? 'static/js/[name].js'
      //   : 'static/js/[name].[hash:8].js'

      config.entry.vendor = [
        require.resolve('react'),
        require.resolve('react-dom'),
        // ... add any other vendor packages with require.resolve('xxx')
      ]

      // add another entry point called vendor
      // config.optimization = {
      //   splitChunks: {
      //     // Chunk splitting optimiztion
      //     chunks: 'all',
      //     // Switch off name generation, otherwise files would be invalidated
      //     // when more chunks with the same vendors are added
      //     name: false,
      //   }
      // }

      config.plugins.push(
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json',
        }),
      )
    }

    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new webpack.SourceMapDevToolPlugin({
          noSources: true
        })
      )
    }

    config.plugins.push(
      new MomentLocalesPlugin()
    )

    config.resolve.alias['@ant-design/icons/lib/dist$'] = path.join(__dirname, 'src/icons.js')

    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: option.target === 'node'
    //     ? // Style-loader does not work in Node.js without some crazy
    //       // magic. Luckily we just need css-loader.
    //     [
    //       {
    //         loader: require.resolve('css-loader'),
    //         options: {
    //           importLoaders: 1,
    //           modules: { auto: true },
    //           onlyLocals: true,
    //         },
    //       },
    //     ]
    //     : [
    //       require.resolve('style-loader'),
    //       {
    //         loader: require.resolve('css-loader'),
    //         options: {
    //           importLoaders: 1,
    //           modules: { auto: true },
    //         },
    //       }
    //     ]
    // })

    return config
  }
}