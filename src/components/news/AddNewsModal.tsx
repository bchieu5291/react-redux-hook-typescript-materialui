import InputField from 'components/custom/InputField'
import SelectDropdownField from 'components/custom/SelectDropdownField'
import UploadFileField from 'components/custom/UploadFileField'
import { ClassificationContext } from 'contexts/ClassificationContext'
import { NewsContext } from 'contexts/NewsContext'
import { FastField, Formik, yupToFormErrors } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Classification } from 'reducers/classificationReducer'
import CKEditorField from './../custom/CKEditorField'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const { CKEditor } = require('@ckeditor/ckeditor5-react')

interface IAddNews {
    title: string
    description: string
    url: string
    image: File[]
    classifications: Classification[]
    languageId: string
}

const AddNewsModal = () => {
    //context
    const { addNews, showAddNewsModal, setShowAddNewsModal } = useContext(NewsContext)
    const {
        getClassifications,
        classifcationState: { classificationsLoading, classifications },
    } = useContext(ClassificationContext)
    //state
    const [t, i18n] = useTranslation('common')

    const initialValues: IAddNews = {
        title: '',
        description: '',
        url: '',
        image: [],
        classifications: [],
        languageId: 'en',
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required field.'),
        description: Yup.string().required('Required field.'),
        classifications: Yup.array().min(1, 'Required field.'),
        image: Yup.array().min(1, 'Required field.'),
    })

    const resetAddNewsData = () => {
        setShowAddNewsModal(false)
    }

    useEffect(() => {
        getClassifications()
    }, [])

    const onSubmit = async (values: IAddNews) => {
        try {
            let _formData = new FormData()
            _formData.append('title', values.title)
            _formData.append('description', values.description)
            _formData.append('url', values.url)
            _formData.append(
                'classifications',
                values.classifications.map((item) => item.value).join(',')
            )
            _formData.append('imageFile', values.image[0] as File)
            _formData.append('languageId', i18n.language)

            // var newNews = {
            //     title: values.title,
            //     description: values.description,
            //     url: values.url,
            //     imageFile: values.image[0],
            // } as News;

            const response = await addNews(_formData)

            resetAddNewsData()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={showAddNewsModal} animation={false} onHide={resetAddNewsData}>
            <Modal.Header closeButton>
                <Modal.Title>Create News</Modal.Title>
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
                                        label='description'
                                        placeholder='news description'
                                    />
                                    <FastField
                                        name='image'
                                        type='file'
                                        component={UploadFileField}
                                        label='Image'
                                        placeholder='Select image'
                                    />
                                    <FastField
                                        name='classifications'
                                        component={SelectDropdownField}
                                        options={classifications}
                                        label='Classifications'
                                        placeholder='Select'
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant='secondary'
                                        onClick={resetAddNewsData.bind(this, false)}
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

export default AddNewsModal
