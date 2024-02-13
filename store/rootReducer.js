import layout from "./layoutReducer";
import todo from "@/components/partials/app/todo/store";
import email from "@/components/partials/app/email/store";
import chat from "@/components/partials/app/chat/store";
import project from "@/components/partials/app/projects/store";
import kanban from "@/components/partials/app/kanban/store";
import calendar from "@/components/partials/app/calender/store";
import auth from "@/components/partials/auth/store";
import rhconsultant from "./rhreducer";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    userAuth:authReducer,
    layout,
    todo,
    email,
    chat,
    project,
    kanban,
    calendar,
    auth,
    rhconsultant,
  },
  devTools: process.env.NODE_ENV !== "production",
});
