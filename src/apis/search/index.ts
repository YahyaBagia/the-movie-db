import { CancelToken } from "axios";

import AxiosClient from "../AxiosClient";
import { IMediaList } from "../interfaces";

export default class SearchAPIs {
  public static async searchMovie(
    query: string,
    page: number,
    cancelToken?: CancelToken
  ): Promise<IMediaList> {
    const response = await AxiosClient.get(`/search/movie`, {
      params: { query, page },
      cancelToken,
    });
    return response.data as IMediaList;
  }

  public static async searchTV(
    query: string,
    page: number,
    cancelToken?: CancelToken
  ): Promise<IMediaList> {
    const response = await AxiosClient.get(`/search/tv`, {
      params: { query, page },
      cancelToken,
    });
    return response.data as IMediaList;
  }
}
