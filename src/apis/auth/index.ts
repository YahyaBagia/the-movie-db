import {
  ICreateSessionResponse,
  IRequestLoginTokenResponse,
} from "./interfaces";
import AxiosClient from "../AxiosClient";

export const authEndpoint = "authentication" as const;

export default class AuthAPIs {
  static async getRequestToken(): Promise<IRequestLoginTokenResponse> {
    const response = await AxiosClient.get(`/${authEndpoint}/token/new`);
    const data = response.data as IRequestLoginTokenResponse;
    return data;
  }

  static async createSession(
    requestToken: string
  ): Promise<ICreateSessionResponse> {
    const response = await AxiosClient.post(`/${authEndpoint}/session/new`, {
      request_token: requestToken,
    });
    const data = response.data as ICreateSessionResponse;
    return data;
  }

  static async deleteSession() {
    await AxiosClient.delete(`/${authEndpoint}/session`);
  }
}
