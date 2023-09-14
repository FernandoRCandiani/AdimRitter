import { api } from "./api";

export async function fetchProfile() {
  const response = await api.get('/users/profile');

  return response.data;
}

export async function fetchRefreshToken() {
  const response = await api.patch('/tokens/refresh');

  return response.data;
}