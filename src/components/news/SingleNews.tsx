import ActionButtons from "components/posts/ActionButtons";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { News } from "reducers/newsReducer";

const SingleNews = (news: News) => {
    const regex = /(<([^>]+)>)/gi;

    const createMakeup = (htmlText: string) => {
        return { __html: htmlText };
    };

    return (
        <Row className="news-single-row">
            <Col>
                <Card>
                    <Row className="no-gutters">
                        <Col md="3">
                            <Card.Img
                                className="news-item-image"
                                variant="top"
                                src={`data:image/jpeg;base64,${news.imageFile.imagebase64}`}
                            />
                        </Col>
                        <Col md="9">
                            <Card.Body>
                                <Card.Title>{news.title}</Card.Title>
                                {/* <Card.Subtitle>Card subtitle</Card.Subtitle> */}
                                <Card.Text>
                                    {news.description.length > 150
                                        ? news.description
                                              .replace(regex, "")
                                              .slice(0, 150)
                                              .concat("...")
                                        : news.description.replace(regex, "")}
                                </Card.Text>
                            </Card.Body>
                            <Row className="no-gutters">
                                <Col className="text-right">
                                    <ActionButtons {...news} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default SingleNews;
