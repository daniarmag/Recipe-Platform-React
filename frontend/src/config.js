// Set the base URL for API requests
const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  // apiBaseUrl: 'https://recipe-platform-react.vercel.app/api'
};

export default config;