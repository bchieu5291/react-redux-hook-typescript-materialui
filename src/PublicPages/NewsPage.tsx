import Footer from "components/Shared/Footer";
import PublicHeader from "components/Shared/PublicHeader";
import PublicNavbar from "components/Shared/PublicNavbar";
import PublicTemplate from "components/Template/PublicTemplate";
import { NewsContext } from "contexts/NewsContext";
import React, { useContext, useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsPage = () => {
    const {
        newsState: { newsListing, newsListingLoading, newsDetail },
        getNews,
        setShowAddNewsModal,
    } = useContext(NewsContext);

    const { findNews } = useContext(NewsContext);

    //Start: Get all news
    useEffect(() => {
        getNews();
    }, []);

    const choosePost = (newId: string) => {
        findNews(newId);
    };

    const regex = /(<([^>]+)>)/gi;

    let firstItem = null;
    let restItems = null;

    if (!newsListingLoading) {
        firstItem = <>Loading...</>;
    }

    var firstNews = newsListing[0];

    if (newsListing && firstNews) {
        firstItem = (
            <>
                <div className="card mb-4">
                    <a href="#!">
                        <img
                            className="card-img-top"
                            src={`data:image/jpeg;base64,${firstNews.imageFile.imagebase64}`}
                            alt="..."
                        />
                    </a>
                    <div className="card-body">
                        <div className="small text-muted">January 1, 2021</div>
                        <h2 className="card-title">{firstNews.title}</h2>
                        <p className="card-text">
                            {" "}
                            {firstNews.description.length > 150
                                ? firstNews.description
                                      .replace(regex, "")
                                      .slice(0, 150)
                                      .concat("...")
                                : firstNews.description.replace(regex, "")}
                        </p>
                        <Nav.Link
                            className="btn btn-primary"
                            to={`/news/${firstNews._id}`}
                            as={Link}
                            onClick={choosePost.bind(this, firstNews._id)}
                        >
                            Read more →
                        </Nav.Link>
                    </div>
                </div>
            </>
        );
    }

    var restNewsListing = newsListing.slice(1);
    if (newsListing && restNewsListing) {
        for (let i = 0; i < restNewsListing.length; i = i + 2) {
            const item1 = restNewsListing[i];
            const item2 = restNewsListing[i + 1];
            console.log("item1", item1);
            console.log("item2", item2);

            restItems = restNewsListing.map((newsItem) => (
                <div className="col-lg-6" key={newsItem._id}>
                    {/* <!-- Blog post--> */}
                    <div className="card mb-4">
                        <a href="#!">
                            <img
                                className="card-img-top maxH-150"
                                src={`data:image/jpeg;base64,${newsItem.imageFile.imagebase64}`}
                                alt="..."
                            />
                        </a>
                        <div className="card-body">
                            <div className="small text-muted">January 1, 2021</div>
                            <h2 className="card-title">{newsItem.title}</h2>
                            <p className="card-text">
                                {" "}
                                {newsItem.description.length > 150
                                    ? newsItem.description
                                          .replace(regex, "")
                                          .slice(0, 150)
                                          .concat("...")
                                    : newsItem.description.replace(regex, "")}
                            </p>
                            <Nav.Link
                                className="btn btn-primary"
                                to={`/news/${newsItem._id}`}
                                as={Link}
                                onClick={choosePost.bind(this, newsItem._id)}
                            >
                                Read more →
                            </Nav.Link>
                        </div>
                    </div>
                </div>
            ));
        }
    }

    return (
        <PublicTemplate>
            <PublicHeader />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {firstItem}
                        <div className="row">{restItems}</div>
                    </div>
                </div>
            </div>
        </PublicTemplate>
    );
};

export default NewsPage;
