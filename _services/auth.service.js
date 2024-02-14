import { authHeader, guestHeader, ApiConfigs } from "../_helpers";

const AuthService = {
  registerUser,
  registerCollector,
  registerEnterprise,
  login,
};

async function registerUser(userData) {
  const requestOptions = {
    method: "POST",
    headers: { ...guestHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };
  return await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.auth.user.register,
    requestOptions
  ).then(handleResponse);
}

async function registerCollector(userData) {
  const requestOptions = {
    method: "POST",
    headers: { ...guestHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };
  return await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.auth.collector.register,
    requestOptions
  ).then(handleResponse);
}

async function registerEnterprise(userData) {
  const requestOptions = {
    method: "POST",
    headers: { ...guestHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };
  return await fetch(
    ApiConfigs.base_url + ApiConfigs.apis.auth.enterprise.register,
    requestOptions
  ).then(handleResponse);
}

async function login(userData) {
  const requestOptions = {
    method: "POST",
    headers: { ...guestHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };
  return await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.auth.login}`,
    requestOptions
  ).then(handleResponse);
}

async function handleResponse(response) {
  try {
    const text = await response.text();
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {

        window.location.href = "/login";
        // console.log("Unauthorized access, redirecting");
      }

      const error = (data) || response.statusText;
      console.log('ervhhghgg', error)
      throw error;
    }

    return data;
  } catch (error) {

    console.error("Response handling error:", error);
    throw error;
  }
}

export default AuthService;
