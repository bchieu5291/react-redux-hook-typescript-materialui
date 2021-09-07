import AddNewsModal from "components/news/AddNewsModal";
import SingleNews from "components/news/SingleNews";
import { NewsContext } from "contexts/NewsContext";
import React, { useContext, useEffect } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import addIcon from "assets/plus-circle-fill.svg";
import UpdateNewsModal from "components/news/UpdateNewsModal";

const NewsListing = () => {
    //context
    const {
        newsState: { newsListing, newsListingLoading, newsDetail },
        getNews,
        setShowAddNewsModal,
    } = useContext(NewsContext);

    //Start: Get all news
    useEffect(() => {
        getNews();
    }, []);

    let body = null;
    body = (
        <>
            <Row className="row-cols-12 g-4 mx-auto mt-3">
                {newsListing.map((news) => (
                    <Col key={news._id} className="my-2 news-item">
                        <SingleNews {...news} />
                    </Col>
                ))}
            </Row>

            {/* {Open Modal} */}
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip id="tool-tip-add-post">Add a new thing to learn</Tooltip>}
            >
                <Button className="btn-floating" onClick={setShowAddNewsModal.bind(this, true)}>
                    <img src={addIcon} alt="addPost" width="60" height="60" />
                </Button>
            </OverlayTrigger>
        </>
    );

    return (
        <div>
            NewsListing
            {newsDetail !== null && <UpdateNewsModal />}
            <AddNewsModal />
            {body}
        </div>
    );
};

export default NewsListing;
