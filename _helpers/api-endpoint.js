function server() {
  return process.env.NEXT_PUBLIC_API_URL ?? "https://my-krew-t2j4.onrender.com/api/";
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
  getPendingPreregistration: "users/preregistartion/getPendingPreregistration",
  getConsultantById: "users/getConsultantById/",
  updatePreregistrationClientInfo: "users/validatePreregistrationClientInfo/",
 }
  },
};


