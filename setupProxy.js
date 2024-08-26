const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/foo",
    createProxyMiddleware({
      target: "http://192.10.223.24:17838", // 陈瓴
      changeOrigin: true,
      pathRewrite: { "^/foo": "" },
    })
  );

  app.use(
    "/res",
    createProxyMiddleware({
      target: "http://192.10.222.129:8600", // 夏杰
      changeOrigin: true,
      pathRewrite: { "^/res": "" },
    })
  );


  app.use(
    "/transcribe",
    createProxyMiddleware({
      target: "http://192.10.222.74:38000", // 语音录入 - 语音转文字
      changeOrigin: true,
    })
  );
};
