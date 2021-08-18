import { PropTypes } from "@material-ui/core";
import React, { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface MovieComponentProps {
  children: ReactNode;
}

interface Movie {
  id: string;
  title: string;
}

interface MovieContextDefault {
  movies: Movie[];
  addMovie: (title: string) => void;
  deleteMovie: (id: string) => void;
}

const movieContextDefaultData = {
  movies: [],
  addMovie: () => {},
  deleteMovie: () => {},
};

export const MovieContext = createContext<MovieContextDefault>(
  movieContextDefaultData
);

const MovieContextProvider = ({ children }: MovieComponentProps) => {
  const [movies, setMovies] = useState<Movie[]>(movieContextDefaultData.movies);

  const addMovie = (title: string) =>
    setMovies([...movies, { id: uuidv4(), title: title }]);
  const deleteMovie = (id: string) =>
    setMovies(movies.filter((move) => move.id !== id));

  const movieContextData = { movies, addMovie, deleteMovie };

  return (
    <MovieContext.Provider value={movieContextData}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
