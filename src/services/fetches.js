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
  const response = await api.get("/users/ranking");

  return response.data;
}

export async function fetchUserCertificatesCompany() {
  const response = await api.get('/usercertificates/employees');

  return response.data;
}

export async function fetchTroubleCompanies() {
  const response = await api.get('/usertroubles/report-employees')

  return response.data
}

export async function fetchMissionCompanies() {
  const response = await api.get('/userquizzes/report-companies')

  return response.data
}

export async function fetchPrizes(filters) {
  const response = await api.get('/prizes', {
    params: {
      limit: 10,
      page: filters.page,
      name: filters.name || undefined
    }
  })

  return response.data
}

export async function fetchMissions(filters) {
  const response = await api.get('/missions', {
    params: {
      limit: 10,
      page: filters.page,
      name: filters.name || undefined
    }
  })

  return response.data
}

