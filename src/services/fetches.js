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
  const response = await api.get('/userlocaletroubles/report-companies', {
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
  const response = await api.get('/userlocaletroubles/report-employees');

  return response.data;
}

export async function fetchMissionCompanies() {
  const response = await api.get('/userquizzes/report-companies');

  return response.data;
}

export async function fetchUsers(filter) {
  const response = await api.get("/users", {
    params: {
      limit: 10,
      page: filter.page ?? 0,
      role: filter.role || undefined,
      name: filter.name || undefined,
    }
  });

  return response.data;
}

export async function fetchPrizes(filter) {
  const response = await api.get('/prizes', {
    params: {
      limit: 10,
      page: filter.page ?? 0,
      name: filter.name || undefined
    }
  });

  return response.data;
}

export async function fetchMissions(filter) {
  const response = await api.get('/quizzes', {
    params: {
      limit: 10,
      page: filter.page ?? 0,
      name: filter.name || undefined
    }
  });

  return response.data;
}

export async function fetchCertificates(filter) {
  const response = await api.get('/certificates', {
    params: {
      limit: 10,
      page: filter.page ?? 0,
      name: filter.name || undefined
    }
  });

  return response.data;
}