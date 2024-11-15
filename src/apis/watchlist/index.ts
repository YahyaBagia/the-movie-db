import store from "@/src/store";

import AxiosClient from "../AxiosClient";
import { MediaType } from "../interfaces";

export default class WatchlistAPIs {
  static async addToWatchlist(movie_id: number) {
    const state = store.getState();
    const { userAccount } = state;
    const { account_details } = userAccount;
    const { id } = account_details ?? {};

    const response = await AxiosClient.post(`/account/${id}/watchlist`, {
      media_type: "movie",
      media_id: movie_id,
      watchlist: true,
    });
    return response.data;
  }

  static async removeFromWatchlist(movie_id: number) {
    const state = store.getState();
    const { userAccount } = state;
    const { account_details } = userAccount;
    const { id } = account_details ?? {};

    const response = await AxiosClient.post(`/account/${id}/watchlist`, {
      media_type: "movie",
      media_id: movie_id,
      watchlist: false,
    });
    return response.data;
  }

  static async fetchWatchlistMovies(page: number) {
    const state = store.getState();
    const { userAccount } = state;
    const { account_details } = userAccount;
    const { id } = account_details ?? {};

    const response = await AxiosClient.get(`/account/${id}/watchlist/movies`, {
      params: { page },
    });
    return response.data;
  }
}
