const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // vue.config.js

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '时光头条'
        return args
      })
  }

})
