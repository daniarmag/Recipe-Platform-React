const isProduction = process.env.NODE_ENV === 'production';

const config = {
  apiBaseUrl: isProduction ? '/api' : 'http://localhost:5000/api',
};

export default config;