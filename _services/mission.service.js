import { authHeader, ApiConfigs } from "../_helpers";

export const missionService = {
  createMission,
  UpdateInformationClientAndPersonalConsultantInfo,
  updateTjm,
  updateMissionStatus,
  getPendingMissions,
  getMissionById,
  ValidateMissionClientInfo,
  getConsultantInfoById,
  updateContractStatus
};

async function createMission(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.createMission,
    requestOptions
  );
  return handleResponse(response);
}
async function updateTjm(id, data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.updateTjm.replace("{id}", id),
    requestOptions
  );
  return handleResponse(response);
}

async function updateContractStatus (id, data) {
  console.log("++++++++++++++++++++++++++++", data)
  const requestOptions = {
    method: "PUT",
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  };
console.log(requestOptions)
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.updateStatusContract + id,

    requestOptions
  );
  console.log("response",response)
  return handleResponse(response);
}
async function updateMissionStatus(id, data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.updateMissionStatus+id,
    requestOptions
  );
  return handleResponse(response);
}
async function getPendingMissions () {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.getPendingMissions,
    requestOptions
  );
  return handleResponse(response);
}

async function getMissionById (id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.getMissionById+id,
    requestOptions
  );
  return handleResponse(response);
}

async function UpdateInformationClientAndPersonalConsultantInfo(data, id) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.mission.UpdateInformationClientAndPersonalConsultantInfo +
      id,
    requestOptions
  );
  return handleResponse(response);
}

async function getConsultantInfoById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.getConsultantInfoByMissionId + id,
    requestOptions
  );
  return handleResponse(response);

}

async function ValidateMissionClientInfo (id, data) {
  const requestOptions = {
    method: "PUT",
    headers: {...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
console.log(requestOptions)
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.mission.validateMissionAndClientInf + id,

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
