import proxy from "http-proxy-middleware";

/**
 * Only for use during development.
 *
 * Creates a proxy on the server for any request that do not go to /api/**.
 *
 * See: README > Development > Running the server and client separately
 */

const PORT = process.env.PORT || 8080;
const TARGET_PORT = (process.env.PORT && +process.env.PORT + 1) || 8081;

export const createProxyToDevClientServer = () => {
  return proxy({
    target: `http://localhost:${TARGET_PORT}`,
    changeOrigin: true,
    cookieDomainRewrite: `http://localhost:${PORT}`,
    onProxyReq: (proxyReq, req) => {
      if (!proxyReq.headersSent) {
        Object.keys(req.headers).forEach(key => {
          proxyReq.setHeader(key, req.headers[key] as string);
        });
      }
    },
    onProxyRes: (proxyRes, _, res) => {
      Object.keys(proxyRes.headers).forEach(key => {
        res.setHeader(key, proxyRes.headers[key] as string);
      });
    },
  });
};
