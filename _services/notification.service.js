import { authHeader, ApiConfigs } from "../_helpers";



async function getNotification(limit) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.notifications.getnotifications,
    requestOptions
  );
  return handleResponse(response);
}

async function deleteNotification(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.notifications.deleteNotificationById+id,
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


export const NotificationServices = {
    getNotification,
    deleteNotification


};
