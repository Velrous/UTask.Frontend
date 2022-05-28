const PROXY_CONFIG = {
  "/api/": {
    target: "https://localhost:7010",
    secure: false,
    changeOrigin: true,
    autoRewrite: true
  }
};

module.exports = PROXY_CONFIG;
