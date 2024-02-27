import { authHeader, ApiConfigs } from "../_helpers";

export const consultantService = {
  getConsultantMissions,
  getConsultantMissionsPending,
  getConsultantMissionsWaitingContract,
  getConsultantMissionsValidated,
  getConsultantMissionsNotValidated,
  getConsultantLastMission,
  getCurrentConsultant,
  updateConsultantProfileImage,
  updateConsultantCIN,
  updateConsultantRIB,
  createCra,
  craAlreadyCreated,
  getConsultantClosestEndDateMission,
  getConsultantVirements
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

async function getCurrentConsultant() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.consultant.getCurrentConsultant,
    requestOptions
  );
  return handleResponse(response);
}

async function updateConsultantProfileImage(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.consultant.updateImage,
    requestOptions
  );
  return handleResponse(response);
}
async function updateConsultantCIN(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.consultant.updateCin,
    requestOptions
  );
  return handleResponse(response);
}
async function updateConsultantRIB(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.consultant.updateRib,
    requestOptions
  );
  return handleResponse(response);
}
async function createCra(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: data,
  };
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.consultant.createCra,
    requestOptions
  );
  return handleResponse(response);
}
async function craAlreadyCreated(missionId) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.craAlreadyCreated.replace("{id}", missionId),
    requestOptions
  );
  return handleResponse(response);
}

async function getConsultantClosestEndDateMission(id) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getClosestEndDateMission.replace("{id}", id),
    requestOptions
  );
  return handleResponse(response);
}

async function getConsultantVirements(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url +
      ApiConfigs.apis.consultant.getVirements.replace("{id}", id),
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
