import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashBoard from "components/Portal/DashBoard";
import CardDetail from "./components/CardListing/CardDetail";
import TopMovieContextProvier from "contexts/TopMovieContext";
import AuthContextProvider from "contexts/AuthContext";
import MovieContextProvider from "contexts/MovieContext";
import ThemeContextProvider from "contexts/ThemeContext";
import ProgressContextProvider from "contexts/ProgressContext";
import { Navigation } from "components/Shared/Navigation";
import CardDetailContextProvider from "contexts/CardDetailContext";
import Landing from "components/layout/Landing";
import Login from "./components/Login";
import AuthTemplate from "./components/Template/AuthTemplate";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Portal from "./components/Portal/Portal";
import ProtectedRoute from "./routing/ProtectedRoute";
import About from "./components/Portal/About";
import PostContextProvider from "contexts/PostContext";

ReactDOM.render(
    <React.StrictMode>
        <CardDetailContextProvider>
            <TopMovieContextProvier>
                <AuthContextProvider>
                    <PostContextProvider>
                        <MovieContextProvider>
                            <ThemeContextProvider>
                                <ProgressContextProvider>
                                    <Router>
                                        <Switch>
                                            <Route exact path="/" component={Landing}></Route>
                                            <Route
                                                exact
                                                path="/login"
                                                render={(props) => (
                                                    <AuthTemplate {...props} authRoute="login" />
                                                )}
                                            ></Route>
                                            <Route
                                                exact
                                                path="/register"
                                                render={(props) => (
                                                    <AuthTemplate {...props} authRoute="register" />
                                                )}
                                            ></Route>
                                            <ProtectedRoute
                                                exact
                                                path="/portal"
                                                component={Portal}
                                            ></ProtectedRoute>
                                            <ProtectedRoute
                                                exact
                                                path="/about"
                                                component={About}
                                            ></ProtectedRoute>
                                            <Route path="/dashboard">
                                                <DashBoard />
                                            </Route>
                                            <Route path="/card-detail">
                                                <CardDetail />
                                            </Route>
                                            <Route path="/movie-listing">
                                                <CardDetail />
                                            </Route>
                                        </Switch>
                                    </Router>
                                </ProgressContextProvider>
                            </ThemeContextProvider>
                        </MovieContextProvider>
                    </PostContextProvider>
                </AuthContextProvider>
            </TopMovieContextProvier>
        </CardDetailContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
