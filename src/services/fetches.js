import { api } from "./api";

export async function fetchProfile() {
  const response = await api.get('/users/profile');

  return response.data;
}

export async function fetchAvgMissionGeneral(group) {
  const response = await api.get('/userquizzes/report-general', {
    params: { group }
  });

  return response.data;
}

export async function fetchAvgTroubleCompanies(group) {
  const response = await api.get('/usertroubles/report-companies', {
    params: { group }
  });

  return response.data;
}

export async function fetchUserCertificates() {
  const response = await api.get('/usercertificates/general');

  return response.data;
}

export async function fetchGeneralRanking() {
  const response = await api.get("/users/ranking")

  return response.data
}