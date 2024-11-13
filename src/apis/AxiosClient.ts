import axios from "axios";

import store from "@/src/store";

import EnvironmentVariables from "@/src/common/EnvironmentVariables";

const { TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_API_TOKEN } =
  EnvironmentVariables;

const AxiosClient = axios.create({
  baseURL: TMDB_API_BASE_URL,
  withCredentials: false,
  timeout: 5000,
});

AxiosClient.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const sessionId = state.session.session_id;

    if (!config.params) {
      config.params = {};
    }

    if (sessionId) {
      config.params["session_id"] = sessionId;
    }

    config.params["api_key"] = TMDB_API_KEY;

    config.headers["Authorization"] = `Bearer ${TMDB_API_TOKEN}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosClient;
