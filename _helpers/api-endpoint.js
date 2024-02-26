import { create } from "@mui/material/styles/createTransitions";

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
      logout: "users/logout",
      forgotPassword: "users/forgot-password",
      resetPassword: "users/reset-password",
      verifyToken: "users/verify-token",
    },
    rh: {
      getConsultant: "users/consultants/getAllConsultant",
      getStatistiques: "users/getConsultantStats",
      getPendingPreregistration:
        "users/preregistartion/getPendingPreregistration",
      getConsultantById: "users/getConsultantById/",
      getConsultantInfoById: "users/getConsultantInfoById/",
      getConsultantInfoWithMissionById:
        "users/getConsultantInfoWithMissionById/",
        getConsultantInfoWithMissionById2:
        "users/getConsultantInfoWithMissionById2/",
      updatePreregistrationClientInfo:
        "users/validatePreregistrationClientInfo/",
      updateStatusProcess: "users/validateProcessus/",
      sendNote: "users/sendNote/",
      getCRAinfoByMissionId : "users/GetCraByMissionId/",
      validateCRA : "users/ValidateCRA/"
    },
    consultant: {
      getAllMissions: "consultant/getAllMissions/{id}",
      getPendingMissions: "consultant/getPendingMissions/{id}",
      getWaitingContractMissions: "consultant/getWaitingContractMissions/{id}",
      getValidatedMissions: "consultant/getValidatedMissions/{id}",
      getNotValidatedMissions: "consultant/getNotValidatedMissions/{id}",
      getLastMission: "consultant/getLastMission/{id}",
      getCurrentConsultant: "users/getCurrantConsultant",
      updateImage: "users/updateImage",
      updateCin: "users/updateCin",
      updateRib: "users/updateRib",
      createCra: "consultant/createCra",
      craAlreadyCreated: "consultant/craAlreadyCreated/{id}",
      getClosestEndDateMission: "consultant/getClosestEndDateMission/{id}",


    },
    preregistration: {
      createPreRegistration1: "users/preRegistration/createPreRegistration1",
      createPreRegistration2: "users/preRegistration/createPreRegistration2",
      createPreRegistration3: "users/preRegistration/createPreRegistration3",
      createPreRegistration4: "users/preRegistration/createPreRegistration4",
    //  getPreregistrationByconsultant :"users/preRegistration/getPreregistration",
     getPreregistrationByconsultant :"users/preRegistration/getPreregistrationFirstMission",
    },
    mission: {
      createMission: "mission/createMission",
      updateTjm: "mission//updateTjm/{id}",
      UpdateInformationClientAndPersonalConsultantInfo: "mission/UpdateInformationClientAndPersonalConsultantInfo/",
      updateMissionStatus: "mission/updateMissionStatus/",
      getPendingMissions:"users/missions/getPendingMissions",
      getMissionById : "mission/getMissionById/",
      validateMissionAndClientInf : "mission/validateMissionClientInfo/",
      getConsultantInfoByMissionId : "mission/getConsultantInfoById/",
      updateStatusContract : "mission/validateProcessus/",
      killMission: "mission/killMission/"

    },
  },
};
