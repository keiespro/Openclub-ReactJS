export default (config) => ({
  compiler_public_path: `http://${config.server_hmr_host}:${config.server_hmr_port}/`,
  proxy: {
    enabled: false,
    options: {
      // koa-proxy options
      host: 'http://localhost:8000',
      match: /^\/api\/.*/
    }
  }
});
