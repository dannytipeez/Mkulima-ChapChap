// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/', // Replace with your Django backend API URL
});

// Add an Axios interceptor to include the JWT token in the "Authorization" header
api.interceptors.request.use(
  (config) => {
    // Get the JWT token from local storage
    const token = localStorage.getItem('access');
	console.log(token);

    // Set the "Authorization" header with the token
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// You can add other default headers, interceptors, etc., here

export default api;

