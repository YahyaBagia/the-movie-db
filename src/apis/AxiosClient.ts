import axios from "axios";

import EnvironmentVariables from "@/src/common/EnvironmentVariables";

const { TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_API_TOKEN } =
  EnvironmentVariables;

const AxiosClient = axios.create({
  baseURL: TMDB_API_BASE_URL,
  withCredentials: false,
});

export default AxiosClient;
