import { authHeader, ApiConfigs } from "../_helpers";

export const consultantService = {
  getConsultantMissions,
  getConsultantMissionsPending,
  getConsultantMissionsWaitingContract,
  getConsultantMissionsValidated,
  getConsultantMissionsNotValidated,
  getConsultantLastMission
};

async function getConsultantMissions(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getAllMissions.replace("{id}", id),
    requestOptions
  );
  return handleResponse(response);
}
async function getConsultantMissionsPending(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getPendingMissions.replace("{id}", id),
    requestOptions
  );
  return handleResponse(response);
}

async function getConsultantMissionsWaitingContract(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getWaitingContractMissions.replace("{id}", id),
    requestOptions
  );
  return handleResponse(response);
}
async function getConsultantMissionsValidated(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getValidatedMissions.replace("{id}", id),
    requestOptions
  );
  return handleResponse(response);
}
async function getConsultantMissionsNotValidated(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getNotValidatedMissions.replace("{id}", id),
    requestOptions
  );
  return handleResponse(response);
}
async function getConsultantLastMission(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getLastMission.replace("{id}", id),
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
