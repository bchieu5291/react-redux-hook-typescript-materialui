import { FormGroup } from "@material-ui/core";
import InputField from "components/custom/InputField";
import UploadFileField from "components/custom/UploadFileField";
import { NewsContext } from "contexts/NewsContext";
import { FastField, Formik } from "formik";
import React, { useContext } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { News } from "reducers/newsReducer";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditorField from "./../custom/CKEditorField";

const { CKEditor } = require("@ckeditor/ckeditor5-react");

interface IAddNews {
    title: string;
    description: string;
    url: string;
    image: File[];
}

const UpdateNewsModal = () => {
    //context
    const {
        newsState: { newsDetail },
        showUpdateNewsModal,
        setShowUpdateNewsModal,
        updateNews,
    } = useContext(NewsContext);

    //state

    let initialValues: IAddNews = {
        ...newsDetail,
        image: [],
    };

    const resetUpdateNewsData = () => {
        setShowUpdateNewsModal(false);
    };

    const onSubmit = async (values: IAddNews) => {
        try {
            let _formData = new FormData();
            _formData.append("title", values.title);
            _formData.append("description", values.description);
            _formData.append("url", values.url);
            _formData.append("imageFile", values.image[0] as File);
            const response = await updateNews(_formData);

            resetUpdateNewsData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={showUpdateNewsModal} animation={false} onHide={resetUpdateNewsData}>
            <Modal.Header closeButton>
                <Modal.Title>Update News</Modal.Title>
            </Modal.Header>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(formikProps) => {
                    const { values, errors, touched, handleSubmit } = formikProps;
                    console.log({ values, errors, touched });
                    return (
                        <>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <Modal.Body>
                                    <FastField
                                        name="title"
                                        component={InputField}
                                        label="Title"
                                        placeholder="news title"
                                    />
                                    <FastField
                                        name="description"
                                        component={CKEditorField}
                                        label="description"
                                        placeholder="news description"
                                    />
                                    <FastField
                                        name="image"
                                        type="file"
                                        component={UploadFileField}
                                        label="Image"
                                        placeholder="Select image"
                                    />
                                    <Row>
                                        <Col>
                                            <Card.Img
                                                src={`${newsDetail.imageFile.imageUrl}`}
                                            ></Card.Img>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={resetUpdateNewsData.bind(this, false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Add
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default UpdateNewsModal;
