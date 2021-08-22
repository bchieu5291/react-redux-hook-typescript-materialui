import { findAllByDisplayValue } from "@testing-library/react";
import { PostContext } from "contexts/PostContext";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Post } from "reducers/postReducer";

const UpdatePostModal = () => {
    //context
    const {
        postState: { postDetail },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
    } = useContext(PostContext);

    //state
    const [updatedPost, setUpdatedPost] = useState(postDetail);

    //fixed update state
    useEffect(() => {
        setUpdatedPost(postDetail);
    }, [updatePost]);

    let { title, description, url, status } = updatedPost;

    const onChangeUpdatedPostForm = (event: React.FormEvent<HTMLInputElement>) =>
        setUpdatedPost({
            ...updatedPost,
            [event.currentTarget.name]: event.currentTarget.value,
        });

    const closeDialog = () => {
        setShowUpdatePostModal(false);
    };

    // const resetAddPostData = () => {
    //     setUpdatedPost({
    //         title: "",
    //         description: "",
    //         url: "",
    //         status: "TO LEARN",
    //     } as Post);
    //     setShowAddPostModal(false);
    // };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await updatePost(updatedPost);
            setShowUpdatePostModal(false);
            setShowToast({
                show: true,
                message: response.message,
                type: response.success ? "success" : "danger",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={(event) => onChangeUpdatedPostForm(event as any)}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={(event) => onChangeUpdatedPostForm(event as any)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube url"
                            name="url"
                            value={url}
                            onChange={(event) => onChangeUpdatedPostForm(event as any)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="select"
                            name="status"
                            value={status}
                            onChange={(event) => onChangeUpdatedPostForm(event as any)}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdatePostModal;
