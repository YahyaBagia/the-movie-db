import axios from "axios";
import EnvironmentVariables from "../../common/EnvironmentVariables";
import {
  ICreateSessionResponse,
  IRequestLoginTokenResponse,
} from "./Interfaces";

const { TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_API_TOKEN } =
  EnvironmentVariables;

export default class AuthAPIs {
  static async getRequestToken(): Promise<IRequestLoginTokenResponse> {
    const response = await axios.get(
      `${TMDB_API_BASE_URL}/authentication/token/new`,
      { params: { api_key: TMDB_API_KEY } }
    );
    const data = response.data as IRequestLoginTokenResponse;
    return data;
  }

  static async createSession(
    requestToken: string
  ): Promise<ICreateSessionResponse> {
    const response = await axios.post(
      `${TMDB_API_BASE_URL}/authentication/session/new`,
      { request_token: requestToken },
      { headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` } }
    );
    const data = response.data as ICreateSessionResponse;
    return data;
  }
}
