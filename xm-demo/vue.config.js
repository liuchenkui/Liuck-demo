const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port:8080,
    proxy: {
      '': {
        target: "http://101.132.181.9/api",
        changeOrigin: true,
        pathRewrite: {
          "":""
        }
      }
    }
  }
})
