import AxiosClient from "../AxiosClient";
import { IAccountState } from "./interfaces";

export default class RatingAPIs {
  static async fetchRating(movieId: number): Promise<IAccountState> {
    const response = await AxiosClient.get(`/movie/${movieId}/account_states`);
    return response.data as IAccountState;
  }

  static async addRating(movieId: number, rating: number) {
    const response = await AxiosClient.post(`/movie/${movieId}/rating`, {
      value: rating,
    });
    return response.data;
  }

  static async deleteRating(movieId: number) {
    const response = await AxiosClient.delete(`/movie/${movieId}/rating`);
    return response.data;
  }
}
