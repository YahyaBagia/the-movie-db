import EnvironmentVariables from "@/src/common/EnvironmentVariables";

import { IAccountDetails } from "./interfaces";
import AxiosClient from "../AxiosClient";

const { TMDB_API_BASE_URL } = EnvironmentVariables;

export const accountEndpoint = "account" as const;

export default class AccountAPIs {
  static async getAccountDetails(): Promise<IAccountDetails> {
    const response = await AxiosClient.get(
      `${TMDB_API_BASE_URL}/${accountEndpoint}`
    );
    const data = response.data as IAccountDetails;
    return data;
  }
}
