export interface IAccountState {
  id: number;
  favorite: boolean;
  rated: IMovieRated | boolean;
  watchlist: boolean;
}

export interface IMovieRated {
  value: number;
}
