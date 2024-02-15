function server() {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3600/api/";
}

export const ApiConfigs = {
  base_url: server(),
  /* -------------------------------- */

  apis: {
    auth: {
      user: { register: "users" },
      login: "users/login",
    },
    rh: {
      getConsultant: "users/consultants/getAllConsultant",
      getStatistiques: "users/getConsultantStats",
      getPendingPreregistration:"users/preregistartion/getPendingPreregistration",
      getConsultantById: "users/getConsultantById/",
      getConsultantInfoById: "users/getConsultantInfoById/",
      updatePreregistrationClientInfo: "users/validatePreregistrationClientInfo/",
      updateStatusProcess :"users/validateProcessus/",
      sendNote:"users/sendNote/",
    },
    consultant: {
      getAllMissions:"consultant/getAllMissions/{id}",
      getPendingMissions:"consultant/getPendingMissions/{id}",
      getWaitingContractMissions:"consultant/getWaitingContractMissions/{id}",
      getValidatedMissions:"consultant/getValidatedMissions/{id}",
      getNotValidatedMissions:"consultant/getNotValidatedMissions/{id}",
      getLastMission:"consultant/getLastMission/{id}",
    },
    preregistration: {
      createPreRegistration1: "users/preRegistration/createPreRegistration1",
      createPreRegistration2: "users/preRegistration/createPreRegistration2",
      createPreRegistration3: "users/preRegistration/createPreRegistration3",
      createPreRegistration4: "users/preRegistration/createPreRegistration4",
  }
  },
};


