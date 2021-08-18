import { topMovieReducer, TopMovieState } from "./../reducers/TopMovieReducer";
import React, { createContext, ReactNode, useReducer, useState } from "react";
import axios from "axios";
import { TopMovieActionType } from "../reducers/types";
import topMoviesInfo from "./../api/getTopMovies";

const { GET_TOP_MOVIES, TOGGLE_TOP_MOVIE_WATCHED } = TopMovieActionType;

interface TopMovieContextProps {
  children: ReactNode;
}

interface TopMovieContextDefault {
  topMovies: TopMovieState;
  getTopMovies: () => Promise<void>;
  toggleWatched: (id: string) => void;
}

const topMoviesDefault: TopMovieState = [];

export const TopMovieContext = createContext<TopMovieContextDefault>({
  topMovies: topMoviesDefault,
  getTopMovies: () => Promise.resolve(void 0),
  toggleWatched: (id: string) => {},
});

const TopMovieContextProvier = ({ children }: TopMovieContextProps) => {
  const [topMovies, dispatch] = useReducer(topMovieReducer, topMoviesDefault);

  //get top movie
  const getTopMovies = async () => {
    const topMovies = await Promise.all(topMoviesInfo);

    dispatch({
      type: GET_TOP_MOVIES,
      payload: topMovies.map((topMovie) => ({
        ...topMovie.data,
        Watched: false,
      })),
    });
  };

  //toggle watched
  const toggleWatched = (imdbId: string) =>
    dispatch({ type: TOGGLE_TOP_MOVIE_WATCHED, payload: imdbId });

  const topMovieContextData = {
    topMovies,
    getTopMovies,
    toggleWatched,
  };

  return (
    <TopMovieContext.Provider value={topMovieContextData}>
      {children}
    </TopMovieContext.Provider>
  );
};

export default TopMovieContextProvier;
