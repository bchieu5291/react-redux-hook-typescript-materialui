import DashBoard from "components/Portal/DashBoard";
import AuthContextProvider from "contexts/AuthContext";
import CardDetailContextProvider from "contexts/CardDetailContext";
import MovieContextProvider from "contexts/MovieContext";
import NewsContextProvider from "contexts/NewsContext";
import PostContextProvider from "contexts/PostContext";
import ProgressContextProvider from "contexts/ProgressContext";
import ThemeContextProvider from "contexts/ThemeContext";
import TopMovieContextProvier from "contexts/TopMovieContext";
import NewsPage from "PublicPages/NewsPage";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CardDetail from "./components/CardListing/CardDetail";
import About from "./components/Portal/About";
import NewsListing from "./components/Portal/NewsListing";
// import "bootstrap/dist/css/bootstrap.min.css";
import Portal from "./components/Portal/Portal";
import AuthTemplate from "./components/Template/AuthTemplate";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ProtectedRoute from "./routing/ProtectedRoute";
import NewsDetailPages from "./PublicPages/NewsDetailPages";

ReactDOM.render(
    <React.StrictMode>
        <CardDetailContextProvider>
            <TopMovieContextProvier>
                <AuthContextProvider>
                    <PostContextProvider>
                        <NewsContextProvider>
                            <MovieContextProvider>
                                <ThemeContextProvider>
                                    <ProgressContextProvider>
                                        <Router>
                                            <Switch>
                                                <Route exact path="/" component={NewsPage}></Route>
                                                <Route
                                                    path="/news/:id"
                                                    component={NewsDetailPages}
                                                ></Route>
                                                <Route
                                                    exact
                                                    path="/login"
                                                    render={(props) => (
                                                        <AuthTemplate
                                                            {...props}
                                                            authRoute="login"
                                                        />
                                                    )}
                                                ></Route>
                                                <Route
                                                    exact
                                                    path="/register"
                                                    render={(props) => (
                                                        <AuthTemplate
                                                            {...props}
                                                            authRoute="register"
                                                        />
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
                                                <ProtectedRoute
                                                    exact
                                                    path="/portal/news"
                                                    component={NewsListing}
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
                        </NewsContextProvider>
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
