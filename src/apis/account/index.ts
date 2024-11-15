import { IAccountDetails } from "./interfaces";
import AxiosClient from "../AxiosClient";

export const accountEndpoint = "account" as const;

export default class AccountAPIs {
  static async getAccountDetails(): Promise<IAccountDetails> {
    const response = await AxiosClient.get(`/${accountEndpoint}`);
    const data = response.data as IAccountDetails;
    return data;
  }
}
