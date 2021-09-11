import Footer from "components/Shared/Footer";
import PublicHeader from "components/Shared/PublicHeader";
import PublicNavbar from "components/Shared/PublicNavbar";
import PublicTemplate from "components/Template/PublicTemplate";
import { NewsContext } from "contexts/NewsContext";
import React, { useContext, useEffect } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "moment";

const NewsPage = () => {
    const {
        newsState: { newsListing, newsListingLoading, newsDetail, total, currentPage },
        getNews,
        setShowAddNewsModal,
    } = useContext(NewsContext);

    const { findNews } = useContext(NewsContext);

    Moment.locale("en");

    //Start: Get all news
    useEffect(() => {
        getNews(undefined, undefined, undefined, 5);
    }, []);

    const choosePost = (newId: string) => {
        findNews(newId);
    };

    const handleLoadmore = () => {
        getNews(undefined, undefined, currentPage + 1, 5, true);
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
                            src={`${firstNews.imageFile.imageUrl.replace(
                                "-original",
                                "-firstNews"
                            )}`}
                            alt="..."
                        />
                    </a>
                    <div className="card-body">
                        <div className="small text-muted">
                            {Moment(firstNews.createAt).format("DD MMM yyyy hh:mm:ss")}
                        </div>
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
                                className="card-img-top"
                                src={`${newsItem.imageFile.imageUrl.replace(
                                    "-original",
                                    "-restNews"
                                )}`}
                                alt="..."
                            />
                        </a>
                        <div className="card-body">
                            <div className="small text-muted">
                                {Moment(newsItem.createAt).format("DD MMM yyyy hh:mm:ss")}
                            </div>
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

    let loadMore = null;
    if (newsListing.length < total) {
        loadMore = (
            <Row className="mx-auto mb-4 justify-content-center text-center">
                <Col xs lg="6">
                    <Button onClick={handleLoadmore}>Load more...</Button>
                </Col>
            </Row>
        );
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
            {loadMore}
        </PublicTemplate>
    );
};

export default NewsPage;
