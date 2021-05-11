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
        '/':{
          target:'https://pingce.planplus.cn',
          changeOrigin:true,
        }
      }
    }
  },
  weapp: {
    esnextModules: ['taro-ui'],
    devServer: {
      port: 10086,
      proxy:{
        '/':{
          target:'https://pingce.planplus.cn',
          changeOrigin:true,
        }
      }
    }
  }
}
