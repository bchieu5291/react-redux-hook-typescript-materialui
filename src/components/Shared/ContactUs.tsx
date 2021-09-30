import axios from 'axios'
import InputField from 'components/custom/InputField'
import TextAreaField from 'components/custom/TextAreaField'
import { FastField, Form, Formik } from 'formik'
import React from 'react'
import { Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { apiUrl } from 'ultilities/constanst'
import * as Yup from 'yup'

const ContactUs = () => {
    interface IContactUs {
        title: string
        email: string
        message: string
    }

    const initialValues: IContactUs = {
        title: '',
        email: '',
        message: '',
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Required field.'),
        email: Yup.string()
            .required('Required field.')
            .email('Should email format: eg: test@gmail.com'),
        message: Yup.string().required('Required field.'),
    })

    const onSubmit = async (values: IContactUs) => {
        try {
            var contactInputValues = {
                title: values.title,
                email: values.email,
                message: values.message,
            } as IContactUs

            try {
                await axios.post(`${apiUrl}/contactUs`, contactInputValues)
                toast('Submit successful!')
            } catch (error: any) {
                if (error.response.data) {
                    toast(error.response.data)
                } else {
                    return { success: false, message: error.message }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section id='contactus'>
            <div className='container text-center'>
                <h1 className='title'>Contact</h1>
                <div className='row'>
                    <div className='col-md-6 mx-auto text-left'>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, { resetForm }) => {
                                onSubmit(values)
                                // your code
                                resetForm()
                            }}
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
                                            <FastField
                                                name='email'
                                                component={InputField}
                                                label='Email'
                                                placeholder='Email'
                                            />
                                            <FastField
                                                name='title'
                                                component={InputField}
                                                label='Title'
                                                placeholder='Subject'
                                            />
                                            <FastField
                                                name='message'
                                                component={TextAreaField}
                                                label='Message'
                                                placeholder='Message'
                                                type='textarea'
                                            />
                                            <Button variant='primary' type='submit'>
                                                Submit
                                            </Button>
                                        </Form>
                                    </>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={5000} />
        </section>
    )
}

export default ContactUs
