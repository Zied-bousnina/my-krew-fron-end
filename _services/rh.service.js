import { authHeader, ApiConfigs } from "../_helpers";

import axios from "axios";


async function getAllConsultant() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.rh.getConsultant,
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

async function getPendingPreregistration () {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.rh.getPendingPreregistration,
    requestOptions
  );
  return handleResponse(response);
}



async function getStatistiques() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.rh.getStatistiques,
    requestOptions
  );
  return handleResponse(response);
}


async function getConsultantById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.rh.getConsultantById + id,
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
    ApiConfigs.base_url + ApiConfigs.apis.rh.getConsultantInfoById + id,
    requestOptions
  );
  return handleResponse(response);

}

async function getConsultantInfoWithMissionById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.rh.getConsultantInfoWithMissionById + id,
    requestOptions
  );
  return handleResponse(response);

}


async function updatePreregistrationClientInfo (id, data) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data)
  };
console.log(requestOptions)
  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.rh.updatePreregistrationClientInfo + id,

    requestOptions
  );
  return handleResponse(response);
}

async function updatePreregistrationStatus (id, data) {
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
    ApiConfigs.base_url + ApiConfigs.apis.rh.updateStatusProcess + id,

    requestOptions
  );
  console.log("response",response)
  return handleResponse(response);
}

async function SendNoteToConsultant (id, data) {
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
    ApiConfigs.base_url + ApiConfigs.apis.rh.sendNote + id,

    requestOptions
  );
  console.log("response",response)
  return handleResponse(response);
}
export const rhServices = {
  getAllConsultant,
  getStatistiques,
  getPendingPreregistration,
  getConsultantById,
  updatePreregistrationClientInfo,
  getConsultantInfoById,
  updatePreregistrationStatus,
  SendNoteToConsultant,
  getConsultantInfoWithMissionById

};
