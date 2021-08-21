import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Post } from "reducers/postReducer";
import ActionButtons from "./ActionButtons";

const SinglePost = (post: Post) => {
    return (
        <Card
            className="shadow"
            border={
                post.status === "LEARNED"
                    ? "success"
                    : post.status === "LEARNING"
                    ? "warning"
                    : "danger"
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{post.title}</p>
                            <Badge
                                pill
                                variant={
                                    post.status === "LEARNED"
                                        ? "success"
                                        : post.status === "LEARNING"
                                        ? "warning"
                                        : "danger"
                                }
                            >
                                {post.status}
                            </Badge>
                        </Col>
                        <Col className="text-right">
                            <ActionButtons {...post} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;
