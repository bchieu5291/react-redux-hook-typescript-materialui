import { PostContext } from "contexts/PostContext";
import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Post } from "reducers/postReducer";

const AddPostModal = () => {
    //state
    const [newPost, setNewPost] = useState<Post>({
        title: "",
        description: "",
        url: "",
        status: "TO LEARN",
    } as Post);

    const { title, description, url } = newPost;

    const onChangeAddPostForm = (event: React.FormEvent<HTMLInputElement>) =>
        setNewPost({
            ...newPost,
            [event.currentTarget.name]: event.currentTarget.value,
        });

    //context
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
        useContext(PostContext);

    const closeDialog = () => {
        resetAddPostData();
    };

    const resetAddPostData = () => {
        setNewPost({
            title: "",
            description: "",
            url: "",
            status: "TO LEARN",
        } as Post);
        setShowAddPostModal(false);
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await addPost(newPost);
            resetAddPostData();
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
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
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
                            onChange={(event) => onChangeAddPostForm(event as any)}
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
                            onChange={(event) => onChangeAddPostForm(event as any)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube url"
                            name="url"
                            value={url}
                            onChange={(event) => onChangeAddPostForm(event as any)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
