import axios from "axios";

import { getToken, signout } from './auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API
});

api.interceptors.request.use(request => {
  const token = getToken();

  if (token) {
    Object.assign(request.headers, {
      Authorization: `Bearer ${token}`
    });
  }

  return request;
});

api.interceptors.response.use(response => {
  return response;
}, async error => {
  if (error?.config?.url !== '/auth/login' && error?.response?.status === 401) {
    return signout();
  }

  return Promise.reject(error);
});