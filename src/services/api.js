import axios from "axios";

import { getToken, setToken } from './auth';
import { fetchRefreshToken } from "./fetches";

export const api = axios.create({
  baseURL: ""
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
  const token = getToken();

  if (error?.response?.status === 401 && token) {
    const response = await fetchRefreshToken();

    setToken(response.data);

    return Promise.resolve();
  }

  return Promise.reject(error);
});