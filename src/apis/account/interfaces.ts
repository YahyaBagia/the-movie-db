export interface IAccountDetails {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path?: string;
    };
  };
  id: number;
  name?: string;
  include_adult: boolean;
  username: string;
}
