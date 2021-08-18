import React, { useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { TopMovieContext } from "../contexts/TopMovieContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topMoviesHeader: {
      paddingTop: 0,
    },
    topMoviesList: {
      paddingTop: 0,
    },
    topMoviesItem: {
      paddingTop: "2px",
      paddingBottom: "2px",
    },
  })
);

const TopMovies = () => {
  //style
  const classes = useStyles();

  //context
  const { topMovies, getTopMovies, toggleWatched } =
    useContext(TopMovieContext);

  useEffect(() => {
    getTopMovies();
  }, []);

  return (
    <Box mt={1} ml={2}>
      <Card raised>
        <CardHeader
          title="Top 10 movies of all items"
          className={classes.topMoviesHeader}
          titleTypographyProps={{
            variant: "h4",
            align: "center",
            color: "primary",
          }}
        ></CardHeader>
        <CardContent>
          <List>
            {topMovies.map((movie) => (
              <ListItem
                key={movie.imdbID}
                button
                className={classes.topMoviesList}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={movie.Wathced}
                    onClick={toggleWatched.bind(this, movie.imdbID)}
                  ></Checkbox>
                </ListItemIcon>
                <ListItemText primary={movie.Title}></ListItemText>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TopMovies;
