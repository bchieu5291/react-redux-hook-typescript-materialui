import AuthContextProvider from 'contexts/AuthContext'
import CardDetailContextProvider from 'contexts/CardDetailContext'
import MovieContextProvider from 'contexts/MovieContext'
import NewsContextProvider from 'contexts/NewsContext'
import PostContextProvider from 'contexts/PostContext'
import ProgressContextProvider from 'contexts/ProgressContext'
import ThemeContextProvider from 'contexts/ThemeContext'
import TopMovieContextProvier from 'contexts/TopMovieContext'
import NewsPage from 'PublicPages/NewsPage'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import CardDetail from './components/CardListing/CardDetail'
// import "bootstrap/dist/css/bootstrap.min.css";
import AuthTemplate from './components/Template/AuthTemplate'
import './index.css'
import reportWebVitals from './reportWebVitals'
import ProtectedRoute from './routing/ProtectedRoute'
import NewsDetailPages from './PublicPages/NewsDetailPages'
import Portal from 'Portal/Portal'
import About from 'Portal/About'
import NewsListing from 'Portal/NewsListing'
import DashBoard from 'Portal/DashBoard'
import PortalResizeImage from './Portal/PortalResizeImage'
import { ChakraProvider } from '@chakra-ui/react'
import ClassificationContextProvider from 'contexts/ClassificationContext'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import common_en from 'translate/en/common.json'
import common_vi from 'translate/vi/common.json'
import PortalBookListing from 'Portal/PortalBookListing'
import BookContextProvider from 'contexts/BookContext'

i18next.use(LanguageDetector).init({
    interpolation: { escapeValue: false }, // React already does escaping
    resources: {
        en: {
            common: common_en, // 'common' is our custom namespace
        },
        vi: {
            common: common_vi,
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <BookContextProvider>
                <ClassificationContextProvider>
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
                                                            <Route
                                                                exact
                                                                path='/'
                                                                component={NewsPage}
                                                            ></Route>
                                                            <Route
                                                                path='/news/:id'
                                                                component={NewsDetailPages}
                                                            ></Route>
                                                            <Route
                                                                exact
                                                                path='/login'
                                                                render={(props) => (
                                                                    <AuthTemplate
                                                                        {...props}
                                                                        authRoute='login'
                                                                    />
                                                                )}
                                                            ></Route>
                                                            <Route
                                                                exact
                                                                path='/register'
                                                                render={(props) => (
                                                                    <AuthTemplate
                                                                        {...props}
                                                                        authRoute='register'
                                                                    />
                                                                )}
                                                            ></Route>
                                                            <ProtectedRoute
                                                                exact
                                                                path='/portal'
                                                                component={Portal}
                                                            ></ProtectedRoute>
                                                            <ProtectedRoute
                                                                exact
                                                                path='/portal/news'
                                                                component={NewsListing}
                                                            ></ProtectedRoute>
                                                            <ProtectedRoute
                                                                exact
                                                                path='/portal/book'
                                                                component={PortalBookListing}
                                                            ></ProtectedRoute>
                                                            <ProtectedRoute
                                                                exact
                                                                path='/portal/resize-image'
                                                                component={PortalResizeImage}
                                                            ></ProtectedRoute>
                                                            <Route path='/dashboard'>
                                                                <DashBoard />
                                                            </Route>
                                                            <Route path='/card-detail'>
                                                                <CardDetail />
                                                            </Route>
                                                            <Route path='/movie-listing'>
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
                </ClassificationContextProvider>
            </BookContextProvider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
