import { Box, Button, Chip, TextField } from "@material-ui/core";
import React, { ChangeEvent, useContext, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MovieContext } from "../contexts/MovieContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    movieInput: {
      marginRight: "3px",
    },
    movieChip: {
      fontSize: "2rem",
      padding: "30px 10px",
      margin: "5px 10px",
    },
  })
);

const Movies = () => {
  //style
  const classes = useStyles();

  //state
  const [movie, setMovie] = useState("");
  const onMovieInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMovie(event.target.value);

  //context
  const { movies, addMovie, deleteMovie } = useContext(MovieContext);
  return (
    <>
      <Box display="flex" justifyContent="center" my={5}>
        <TextField
          label="your favorite movie"
          variant="outlined"
          className={classes.movieInput}
          onChange={onMovieInputChange}
          value={movie}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addMovie(movie);
            setMovie("");
          }}
        >
          Add
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" flexWrap="wrap" mx={5}>
        {movies.map((movie) => (
          <Chip
            key={movie.id}
            label={movie.title}
            clickable
            color="primary"
            className={classes.movieChip}
            onDelete={deleteMovie.bind(this, movie.id)}
          ></Chip>
        ))}
      </Box>
    </>
  );
};

export default Movies;
