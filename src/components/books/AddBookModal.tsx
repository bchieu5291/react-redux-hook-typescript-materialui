import { BookContext } from 'contexts/BookContext'
import { FastField, Formik } from 'formik'
import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IAddUpdateBooks } from 'reducers/bookReducer'
import * as Yup from 'yup'
import { Form } from 'react-bootstrap'
import InputField from 'components/custom/InputField'
import CKEditorField from 'components/custom/CKEditorField'
import UploadFileField from 'components/custom/UploadFileField'
import { Classification } from 'reducers/classificationReducer'
import SelectDropdownField from './../custom/SelectDropdownField'
import { ClassificationContext } from 'contexts/ClassificationContext'

interface IAddBook {
    title: string
    description: string
    url: string
    image: File[]
    bookFile: File[]
    classifications: Classification[]
    languageId: string
}

const AddBookModal = () => {
    //context
    const { addBook, showAddBookModal, setShowAddBookModal } = useContext(BookContext)
    const {
        classifcationState: { classificationsLoading, classifications },
    } = useContext(ClassificationContext)

    //state
    const [t, i18n] = useTranslation('common')

    const initialValues: IAddBook = {
        title: '',
        description: '',
        url: '',
        image: [],
        bookFile: [],
        classifications: [],
        languageId: 'en',
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required field.'),
        description: Yup.string().required('Required field.'),
        image: Yup.array().min(1, 'Required field.'),
        bookFile: Yup.array().min(1, 'Required field.'),
        classifications: Yup.array().min(1, 'Required field.'),
        url: Yup.string().required('Required field.'),
    })

    const resetAddBookData = () => {
        setShowAddBookModal(false)
    }

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
            const response = await addBook(_formData)

            resetAddBookData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={showAddBookModal} animation={false} onHide={resetAddBookData}>
            <Modal.Header closeButton>
                <Modal.Title>Create Book</Modal.Title>
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
                                    />
                                    <FastField
                                        name='description'
                                        component={CKEditorField}
                                        label='Description'
                                        placeholder='news description'
                                    />
                                    <FastField
                                        name='url'
                                        component={InputField}
                                        label='Url'
                                        placeholder='http://'
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
                                    <FastField
                                        name='bookFile'
                                        type='file'
                                        component={UploadFileField}
                                        label='Book File'
                                        placeholder='Select book'
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant='secondary'
                                        onClick={resetAddBookData.bind(this, false)}
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

export default AddBookModal
