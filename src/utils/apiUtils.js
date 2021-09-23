import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:8000`,
});

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('user_token');

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default api;
