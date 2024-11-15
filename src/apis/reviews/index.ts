import AxiosClient from "../AxiosClient";

import { IReviewsResponse } from "./interfaces";

class ReviewsAPIs {
  static async fetchMovieReviews(
    movieId: number,
    page: number = 1
  ): Promise<IReviewsResponse> {
    const response = await AxiosClient.get(`/movie/${movieId}/reviews`, {
      params: { page },
    });
    return response.data;
  }
}

export default ReviewsAPIs;
