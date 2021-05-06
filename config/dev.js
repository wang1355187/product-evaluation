module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      port: 10086,
      proxy:{
        '/api':{
          target:'https://pingce.planplus.cn',
          changeOrigin:true,
          pathRewrite:{
            '/api':''
          }
        }
      }
    }
  },
  weapp: {
    esnextModules: ['taro-ui'],
    devServer: {
      port: 10086,
      proxy:{
        '/api':{
          target:'https://pingce.planplus.cn',
          changeOrigin:true,
          pathRewrite:{
            '/api':''
          }
        }
      }
    }
  }
}
