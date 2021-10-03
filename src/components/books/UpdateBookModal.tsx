import { FormGroup } from '@material-ui/core'
import InputField from 'components/custom/InputField'
import UploadFileField from 'components/custom/UploadFileField'
import { NewsContext } from 'contexts/NewsContext'
import { FastField, Formik } from 'formik'
import React, { useContext } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { News } from 'reducers/newsReducer'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditorField from './../custom/CKEditorField'
import { Classification } from 'reducers/classificationReducer'
import SelectDropdownField from 'components/custom/SelectDropdownField'
import { ClassificationContext } from 'contexts/ClassificationContext'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { getLongTextContent4Multilanguage, getTextContent4Multilanguage } from 'ultilities/helper'
import { BookContext } from 'contexts/BookContext'

const { CKEditor } = require('@ckeditor/ckeditor5-react')

interface IAddBook {
    title: string
    description: string
    url: string
    image: File[]
    bookFile: File[]
    classifications: Classification[]
    languageId: string
}

const UpdateBookModal = () => {
    //context
    const {
        bookState: { bookDetail },
        showUpdateBookModal,
        setShowUpdateBookModal,
        updateBook,
    } = useContext(BookContext)

    const {
        getClassificationsByType,
        classifcationState: { classificationsLoading, classifications },
    } = useContext(ClassificationContext)

    const [t, i18n] = useTranslation('common')

    //state

    let initialValues: IAddBook = {
        ...bookDetail,
        title: getTextContent4Multilanguage(bookDetail.title, i18n.language),
        description: getLongTextContent4Multilanguage(bookDetail.description, i18n.language),
        image: [],
        bookFile: [],
        classifications:
            bookDetail.classifications.map((item) => ({
                value: item._id,
                label: item.title,
            })) || [],
        languageId: 'en',
    }

    const resetUpdateBookData = () => {
        setShowUpdateBookModal(false)
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required field.'),
        description: Yup.string().required('Required field.'),
    })

    const onSubmit = async (values: IAddBook) => {
        try {
            let _formData = new FormData()
            _formData.append('title', values.title)
            _formData.append('description', values.description)
            _formData.append('url', values.url)
            _formData.append('imageFile', values.image[0] as File)
            _formData.append('bookFile', values.bookFile[0] as File)
            _formData.append(
                'classifications',
                values.classifications.map((item) => item.value).join(',')
            )
            _formData.append('languageId', i18n.language)
            const response = await updateBook(_formData)

            resetUpdateBookData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={showUpdateBookModal} animation={false} onHide={resetUpdateBookData}>
            <Modal.Header closeButton>
                <Modal.Title>Update News</Modal.Title>
            </Modal.Header>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    const { values, errors, touched, handleSubmit } = formikProps
                    console.log({ values, errors, touched })
                    return (
                        <>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                }}
                            >
                                <Modal.Body>
                                    <FastField
                                        name='title'
                                        component={InputField}
                                        label='Title'
                                        placeholder='news title'
                                        isMultiLanguage={true}
                                    />
                                    <FastField
                                        name='description'
                                        component={CKEditorField}
                                        label='description'
                                        placeholder='news description'
                                    />
                                    <FastField
                                        name='url'
                                        component={InputField}
                                        label='Url'
                                        placeholder='http://'
                                        isMultiLanguage={true}
                                    />
                                    <FastField
                                        name='classifications'
                                        component={SelectDropdownField}
                                        options={classifications}
                                        label='Classifications'
                                        placeholder='Select'
                                    />

                                    <FastField
                                        name='image'
                                        type='file'
                                        component={UploadFileField}
                                        label='Image'
                                        placeholder='Select image'
                                    />

                                    <Row className='mb-2'>
                                        <Col md='4'>
                                            <Card.Img
                                                src={`${bookDetail.imageFile.imageUrl}`}
                                            ></Card.Img>
                                        </Col>
                                    </Row>
                                    <FastField
                                        name='bookFile'
                                        type='file'
                                        component={UploadFileField}
                                        label='Book File'
                                        placeholder='Select Book File'
                                    />
                                    <Row className='mb-2'>
                                        <Col>
                                            <Card.Text>
                                                {bookDetail.bookFile?.fileUrl ?? ''}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant='secondary'
                                        onClick={resetUpdateBookData.bind(this, false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant='primary' type='submit'>
                                        Add
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default UpdateBookModal
