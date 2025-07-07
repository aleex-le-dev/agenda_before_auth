import { configureStore } from "@reduxjs/toolkit";
import agendaReducer from "./slices/agendaSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    agenda: agendaReducer,
    auth: authReducer,
  },
});
