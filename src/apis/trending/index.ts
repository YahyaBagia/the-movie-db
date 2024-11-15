import AxiosClient from "../AxiosClient";
import { IMediaList, MediaType, TimeFrame } from "../interfaces";

export default class TrendingAPIs {
  public static async getTrending(
    time_frame: TimeFrame,
    media_type: MediaType,
    page: number
  ): Promise<IMediaList> {
    const response = await AxiosClient.get(
      `/trending/${media_type}/${time_frame}`,
      { params: { page } }
    );
    const data = response.data as IMediaList;
    return data;
  }
}
