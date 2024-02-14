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
      getPendingPreregistration:
        "users/preregistartion/getPendingPreregistration",
      getConsultantById: "users/getConsultantById/",
      updatePreregistrationClientInfo:
        "users/validatePreregistrationClientInfo/",
    },
    consultant: {
      getAllMissions:"consultant/getAllMissions/{id}",
      getPendingMissions:"consultant/getPendingMissions/{id}",
      getWaitingContractMissions:"consultant/getWaitingContractMissions/{id}",
      getValidatedMissions:"consultant/getValidatedMissions/{id}",
      getNotValidatedMissions:"consultant/getNotValidatedMissions/{id}",
    },
  },
};
