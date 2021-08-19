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

ReactDOM.render(
  <React.StrictMode>
    <CardDetailContextProvider>
      <TopMovieContextProvier>
        <AuthContextProvider>
          <MovieContextProvider>
            <ThemeContextProvider>
              <ProgressContextProvider>
                <Router>
                  <Switch>
                    <Route exact path="/">
                      <App />
                    </Route>
                    <Route path="/dashboard">
                      <DashBoard />
                    </Route>
                    <Route path="/card-detail">
                      <CardDetail />
                    </Route>
                  </Switch>
                </Router>
              </ProgressContextProvider>
            </ThemeContextProvider>
          </MovieContextProvider>
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
