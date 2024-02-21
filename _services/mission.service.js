import { authHeader, ApiConfigs } from "../_helpers";

export const missionService = {createMission, UpdateInformationClientAndPersonalConsultantInfo};

async function createMission(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.mission.createMission,
    requestOptions
  );
  return handleResponse(response);
}

async function UpdateInformationClientAndPersonalConsultantInfo(data,id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.mission.UpdateInformationClientAndPersonalConsultantInfo+ id,
    requestOptions
  );
  return handleResponse(response);
}
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/";
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
