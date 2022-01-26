module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8022", //这里填入你要请求的接口的前缀
        ws: true, //代理websocked
        changeOrigin: true, //虚拟的站点需要更管origin
        pathRewrite: {
          "^/api": "", //重写路径
        },
      },
    },
    port: 8011,
  },
};
