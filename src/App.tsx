import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.scss";
import { Navbar } from "./components/Navbar";
import ProgressContextProvider, { ProgressContext } from "./contexts/ProgressContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import ToggleThemeBtn from "./components/ToggleThemeBtn";
import MovieContextProvider from "./contexts/MovieContext";
import Movies from "./components/Movies";
import AuthContextProvider from "./contexts/AuthContext";
import { Grid } from "@material-ui/core";
import TopMovies from "./components/TopMovies";
import TopMovieContextProvier from "./contexts/TopMovieContext";

function App() {
    return (
        <div>
            <TopMovieContextProvier>
                <AuthContextProvider>
                    <MovieContextProvider>
                        <ThemeContextProvider>
                            <ProgressContextProvider>
                                <Navbar></Navbar>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <TopMovies></TopMovies>
                                        <Movies></Movies>
                                    </Grid>
                                </Grid>
                                <ToggleThemeBtn></ToggleThemeBtn>
                            </ProgressContextProvider>
                        </ThemeContextProvider>
                    </MovieContextProvider>
                </AuthContextProvider>
            </TopMovieContextProvier>
        </div>
    );
}

export default App;
