import { authHeader, ApiConfigs } from "../_helpers";

import axios from "axios";


async function getAllConsultant() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.admin.getALlRhUsers ,
    requestOptions
  );
  return handleResponse(response);
}

async function AddNewRh(data) {

const requestOptions = {
  method: "POST",
  headers: {
      ...authHeader(),

    },
    body:data,
};


const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.admin.AddNewRH,
    requestOptions

);

return handleResponse(response);
}


async function DeleteRhAccount(id) {

const requestOptions = {
  method: "DELETE",
  headers: {
      ...authHeader(),

    },

};


const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.admin.deleteRhAccount+id,
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


export const adminServices = {
  getAllConsultant,
  AddNewRh,
  DeleteRhAccount


};
