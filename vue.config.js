module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.0.120:8022", //这里填入你要请求的接口的前缀
        ws: true, //代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        pathRewrite: {
          "^/api": "", //重写路径
        },
      },
      "/qq": {
        target: "https://apis.map.qq.com", //这里填入你要请求的接口的前缀
        ws: true, //代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        pathRewrite: {
          "^/qq": "", //重写路径
        },
      },
    },
    port: 8011,
  },
};
