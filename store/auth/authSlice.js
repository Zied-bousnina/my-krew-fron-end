import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  id: "",
  email: "",
  role: "",
  isLoggedIn: false,
  token: "",
  exp: null,
  iat: null,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login(state, action) {
      const decodedToken = jwtDecode(action.payload.token);
      if (decodedToken.role) {
        localStorage.setItem("jwtToken", action.payload.token);
        state.id = decodedToken.id;
        state.email = decodedToken.email;
        state.role = decodedToken.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.exp = decodedToken.exp;
        state.iat = decodedToken.iat;
        switch (decodedToken.role) {
          case "RH":
            // action.payload.router.push("/rh");
            break;
          case "CONSULTANT":
            switch (decodedToken.preRegister.status) {
              case "NOTEXIST":
                action.payload.router.push(`/register/${decodedToken.id}`);
                break;
              case "PENDING":
                action.payload.router.push(`/pending/${decodedToken.id}`);
                break;
              case "NOTVALIDATED":
                action.payload.router.push(`/declined/${decodedToken.id}`);
                break;
              default:
                action.payload.router.push("/consultant");
                break;
            }
            break;
          default:
            action.payload.router.push("/");
            break;
        }
      }
    },
    logout(state, action) {
      localStorage.removeItem("jwtToken");
      state.id = "";
      state.email = "";
      state.role = "";
      state.token = "";
      state.isLoggedIn = false;
      state.exp = null;
      state.iat = null;
      action.payload.router.push("/");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
