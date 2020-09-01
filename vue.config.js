let webpack = require('webpack')

module.exports = {

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'APP_NAME'   : JSON.stringify(process.env.APP_NAME),
          'PORT'       : JSON.stringify(process.env.PORT),
          'PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH),
        }
      })
    ]
  }
  ,

// publicPath: process.env.PUBLIC_PATH || '/',

  devServer: {
    port: process.env.PORT || 4000
  }
}
;
