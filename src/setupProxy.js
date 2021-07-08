const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api/users",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
  app.use(
    "/api/boards",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
  app.use(
    "/api/lists",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
  app.use(
    "/api/tasks",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
  app.use(
    "/api/tasks/reorder",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true
    })
  );
};
