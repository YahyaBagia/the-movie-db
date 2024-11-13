import EnvironmentVariables from "@/src/common/EnvironmentVariables";

import {
  ICreateSessionResponse,
  IRequestLoginTokenResponse,
} from "./interfaces";
import AxiosClient from "../AxiosClient";

const { TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_API_TOKEN } =
  EnvironmentVariables;

export const authEndpoint = "authentication" as const;

export default class AuthAPIs {
  static async getRequestToken(): Promise<IRequestLoginTokenResponse> {
    const response = await AxiosClient.get(
      `${TMDB_API_BASE_URL}/${authEndpoint}/token/new`,
      { params: { api_key: TMDB_API_KEY } }
    );
    const data = response.data as IRequestLoginTokenResponse;
    return data;
  }

  static async createSession(
    requestToken: string
  ): Promise<ICreateSessionResponse> {
    const response = await AxiosClient.post(
      `${TMDB_API_BASE_URL}/${authEndpoint}/session/new`,
      { request_token: requestToken },
      { headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` } }
    );
    const data = response.data as ICreateSessionResponse;
    return data;
  }

  static async deleteSession() {
    await AxiosClient.delete(`${TMDB_API_BASE_URL}/${authEndpoint}/session`);
  }
}
