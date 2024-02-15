import { authHeader, guestHeader, ApiConfigs } from "../_helpers";

const AuthService = {
  registerUser,
  registerCollector,
  registerEnterprise,
  login,
  Register1,
  Register2,
  Register3
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
        
      }

      const error = (data) || response.statusText;
     
      throw error;
    }

    return data;
  } catch (error) {

 
    throw error;
  }
}

async function Register1(data) {
  const requestOptions = {
    method: "POST",
  headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
    };


  const response = await fetch(
      ApiConfigs.base_url + ApiConfigs.apis.preregistration.createPreRegistration1,
      requestOptions

  );

  return handleResponse(response);
}

async function Register2(data) {

  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data ",




    },
    body: data,
  };

 
  const response = await fetch(
      ApiConfigs.base_url + ApiConfigs.apis.preregistration.createPreRegistration2,
      requestOptions

  );

  return handleResponse(response);
}

async function Register3(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };


  const response = await fetch(
      ApiConfigs.base_url + ApiConfigs.apis.preregistration.createPreRegistration3,
      requestOptions

  );

  return handleResponse(response);
}

export default AuthService;
