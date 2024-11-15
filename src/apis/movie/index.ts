import AxiosClient from "../AxiosClient";
import { IMediaList } from "../interfaces";
import {
  ICredits,
  IKeywordsResponse,
  IMovieDetails,
  IMovieImages,
} from "./interfaces";

export default class MovieAPIs {
  public static async fetchDetails(movieId: number): Promise<IMovieDetails> {
    const response = await AxiosClient.get(`/movie/${movieId}`);
    return response.data as IMovieDetails;
  }

  public static async fetchImages(movieId: number): Promise<IMovieImages> {
    const response = await AxiosClient.get(`/movie/${movieId}/images`);
    return response.data as IMovieImages;
  }

  public static async fetchRecommendations(
    movieId: number,
    page: number
  ): Promise<IMediaList> {
    const response = await AxiosClient.get(
      `/movie/${movieId}/recommendations`,
      { params: { page } }
    );
    return response.data as IMediaList;
  }

  public static async fetchSimilarMovies(
    movieId: number,
    page: number
  ): Promise<IMediaList> {
    const response = await AxiosClient.get(`/movie/${movieId}/similar`, {
      params: { page },
    });
    return response.data as IMediaList;
  }

  public static async fetchCredits(movieId: number): Promise<ICredits> {
    const response = await AxiosClient.get(`/movie/${movieId}/credits`);
    return response.data as ICredits;
  }

  public static async fetchKeywords(
    movieId: number
  ): Promise<IKeywordsResponse> {
    const response = await AxiosClient.get(`/movie/${movieId}/keywords`);
    return response.data as IKeywordsResponse;
  }
}
