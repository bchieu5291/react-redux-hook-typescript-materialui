import { PostContext } from "contexts/PostContext";
import React, { useContext, useEffect } from "react";
import { Button, Card, Col, OverlayTrigger, Row, Spinner, Toast, Tooltip } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import SinglePost from "components/posts/SinglePost";
import AddPostModal from "./../posts/AddPostModal";
import addIcon from "assets/plus-circle-fill.svg";
import UpdatePostModal from "./../posts/UpdatePostModal";
import { IToast } from "model/AuthForm";

const Portal = () => {
    //context
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    const {
        postState: { posts, postsLoading, postDetail },
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        showToast,
        setShowToast,
    } = useContext(PostContext);

    //Start: Get all posts
    useEffect(() => {
        getPosts();
    }, []);

    let body = null;

    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>
                            Learnt It
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => (
                        <Col key={post._id} className="my-2">
                            <SinglePost {...post} />
                        </Col>
                    ))}
                </Row>

                {/* {Open Modal} */}
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip id="tool-tip-add-post">Add a new thing to learn</Tooltip>}
                >
                    <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt="addPost" width="60" height="60" />
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    return (
        <>
            {body}
            <AddPostModal />
            {postDetail !== null && <UpdatePostModal />}
            {/* show toast after added post */}
            <Toast
                show={showToast.show}
                style={{ position: "fixed", top: "20%", right: "10%" }}
                className={`bg-${showToast.type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: "",
                    type: "",
                } as IToast)}
                delay={3000}
                autohide
            >
                <strong>{showToast.message}</strong>
            </Toast>
        </>
    );
};

export default Portal;
