import axios from "axios";

import EnvironmentVariables from "@/src/common/EnvironmentVariables";

const { TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_API_TOKEN } =
  EnvironmentVariables;

const AxiosClient = axios.create({
  baseURL: TMDB_API_BASE_URL,
  withCredentials: false,
});

AxiosClient.interceptors.request.use(
  async (config) => {
    config.params = {
      ...config.params,
      api_key: TMDB_API_KEY,
    };

    config.headers["Authorization"] = `Bearer ${TMDB_API_TOKEN}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosClient;
