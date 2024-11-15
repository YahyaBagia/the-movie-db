import { IPaginatedResponse } from "../interfaces";

export interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at?: string; // Optional as not all reviews may have an updated timestamp
  url: string;
}

export interface IReviewsResponse extends IPaginatedResponse {
  results: IReview[];
}
