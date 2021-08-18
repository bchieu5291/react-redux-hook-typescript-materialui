import { TopMovieActionType } from "./types";

export interface TopMovie {
  imdbID: string;
  Title: string;
  Wathced: boolean;
}

const { GET_TOP_MOVIES, TOGGLE_TOP_MOVIE_WATCHED } = TopMovieActionType;

export type TopMovieState = TopMovie[];

type TopMoveAction =
  | {
      type: typeof GET_TOP_MOVIES;
      payload: TopMovie[];
    }
  | {
      type: typeof TOGGLE_TOP_MOVIE_WATCHED;
      payload: string;
    };

export const topMovieReducer = (
  state: TopMovieState,
  action: TopMoveAction
) => {
  switch (action.type) {
    case "GET_TOP_MOVIES":
      return action.payload;
    case TOGGLE_TOP_MOVIE_WATCHED:
      return state.map((topMovie) =>
        topMovie.imdbID === action.payload
          ? { ...topMovie, Watched: !topMovie.Wathced }
          : topMovie
      );
    default:
      return state;
  }
};
