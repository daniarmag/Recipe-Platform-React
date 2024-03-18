import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxy = (app) => {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

export default setupProxy;