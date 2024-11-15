import { IPaginatedResponse } from "../interfaces";

export interface IMediaList extends IPaginatedResponse {
  results: Array<IMediaItem>;
}

export interface IMediaItem {
  id: number;
  media_type: "movie" | "tv";
  backdrop_path?: string;
  poster_path?: string;
  adult?: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;

  // Fields for movies
  title?: string;
  original_title?: string;
  release_date?: string;

  // Fields for TV shows
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export type TimeFrame = "day" | "week";
export type MediaType = "movie" | "tv";
