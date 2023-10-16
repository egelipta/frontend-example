/**
 * @name Proxy configuration
 * @see The production environment agent cannot take effect, so there is no configuration of the production environment here
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // The address to be proxy
      target: 'http://127.0.0.1:8888/',
      // Configure this from HTTP to HTTPS
      // The function of relying on Origin may need this, such as cookies
      changeOrigin: true,
    },
  },

  /**
   * @name Detailed proxy configuration
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
