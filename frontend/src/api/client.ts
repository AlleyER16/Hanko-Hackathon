import axios from "axios";
import { tRootState } from "../store";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.code === "ERR_BAD_REQUEST" && error.response.status === 401) {
      const appStateRaw = localStorage.getItem("appState");

      if (appStateRaw) {
        const appState: tRootState = JSON.parse(appStateRaw);

        appState.auth.loggedIn = false;

        localStorage.setItem("appState", JSON.stringify(appState));
      }

      window.location.assign("/sign-in");
    }
    return Promise.reject(error);
  }
);

export default instance;
