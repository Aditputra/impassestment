import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (!document.cookie.includes('XSRF-TOKEN')) {
    await axios.get(`${api.defaults.baseURL}/sanctum/csrf-cookie`, { withCredentials: true });
  }
  return config;
});

export default api;