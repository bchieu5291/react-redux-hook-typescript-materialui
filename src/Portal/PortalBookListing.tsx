import SingleBook from 'components/books/SingleBook'
import { BookContext } from 'contexts/BookContext'
import React, { useContext, useRef } from 'react'
import { Button, Col, OverlayTrigger, Tooltip, Pagination, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import addIcon from 'assets/plus-circle-fill.svg'
import AddBookModal from './../components/books/AddBookModal'
import UpdateBookModal from './../components/books/UpdateBookModal'
import qs from 'querystring'
import { useHistory, useLocation } from 'react-router-dom'
import { ClassificationContext } from 'contexts/ClassificationContext'
import { Field, Form, Formik } from 'formik'
import SelectDropdownField from 'components/custom/SelectDropdownField'
import InputField from 'components/custom/InputField'
import { Classification } from 'reducers/classificationReducer'

const PortalBookListing = () => {
    //context
    const {
        bookState: { bookListing, bookListingLoading, totalPages, currentPage, total, bookDetail },
        getBook,
        setShowAddBookModal,
    } = useContext(BookContext)

    const {
        getClassificationsByType,
        classifcationState: { classificationsLoading, classifications },
    } = useContext(ClassificationContext)

    const formikRef = useRef<any>(null) // call submit outside formik

    //router
    var router = useHistory()
    const location = useLocation()

    useEffect(() => {
        getBook()
        getClassificationsByType('book')
    }, [])

    //Get all news when url change
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        getBook(
            params.title,
            params.classifications,
            params.page ? (parseInt(params.page) - 1) * 3 : 0,
            undefined
        )
        window.scrollTo(0, 0)

        if (formikRef.current) {
            formikRef.current.setFieldValue('title', params.title ?? '')
            formikRef.current.setFieldValue(
                'classifications',
                params.classifications?.split(',').map(
                    (t) =>
                        ({
                            value: t,
                        } as Classification)
                ) ?? []
            )
        }
    }, [location])

    let body = null
    body = (
        <>
            <div className='mx-auto mt-3'>
                {bookListing.map((book) => (
                    <Col key={book._id} className='col-xs-12 col-md-12 my-2 news-item'>
                        <SingleBook {...book} />
                    </Col>
                ))}
            </div>

            {/* {Open Modal} */}
            <OverlayTrigger
                placement='left'
                overlay={<Tooltip id='tool-tip-add-post'>Add new book</Tooltip>}
            >
                <Button
                    variant='light'
                    className='btn-floating'
                    onClick={setShowAddBookModal.bind(this, true)}
                >
                    <img src={addIcon} alt='addPost' width='60' height='60' />
                </Button>
            </OverlayTrigger>
        </>
    )

    let initialValues = {
        title: '',
        classifications: [] as Classification[],
    }

    const onClickApplySearch = async (values: any) => {
        router.push({
            search: `title=${values.title}&classifications=${values.classifications
                .map((t: any) => t.value)
                .join(',')}&page=1`, // query string
        })
    }

    const handleReset = (setFieldValue: any) => {
        setFieldValue('title', '')
        setFieldValue('classifications', [])
        router.push({
            search: ``, // query string
        })
    }

    let filter = null
    filter = (
        <>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                onSubmit={onClickApplySearch}
            >
                {(formikProps) => {
                    const { values, errors, touched, handleSubmit, setFieldValue } = formikProps
                    console.log({ values, errors, touched })
                    return (
                        <>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                }}
                            >
                                <Row className='mx-auto mt-4'>
                                    <Col xs lg='4'>
                                        <Field
                                            name='title'
                                            component={InputField}
                                            label='Title'
                                            placeholder='book title'
                                        />
                                    </Col>

                                    <Col xs lg='4'>
                                        <Field
                                            name='classifications'
                                            component={SelectDropdownField}
                                            options={classifications}
                                            label='Classifications'
                                            placeholder='Select'
                                        />
                                    </Col>
                                </Row>
                                <Row className='mx-auto'>
                                    <Col xs lg='4' className='my-0'>
                                        <Button variant='primary' type='submit' className='mr-2'>
                                            Apply
                                        </Button>
                                        <Button
                                            variant='primary'
                                            type='button'
                                            className='mr-2'
                                            onClick={handleReset.bind(this, setFieldValue)}
                                        >
                                            Clear
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    )
                }}
            </Formik>
        </>
    )

    const handlePagination = (page: number) => {
        const queryParams = qs.parse(location.search.replace('?', ''))
        const newQueries = { ...queryParams, page: page }
        router.push({ search: qs.stringify(newQueries) })
    }

    let paginations = []
    for (let i = 0; i < totalPages; i++) {
        const isActive = currentPage === i + 1

        paginations.push(
            <Pagination.Item key={i} active={isActive} onClick={handlePagination.bind(this, i + 1)}>
                {i + 1}
            </Pagination.Item>
        )
    }

    return (
        <div>
            <AddBookModal />
            {bookDetail !== null && <UpdateBookModal />}
            {filter}
            {body}
            <Row className='row-cols-12 g-4 mx-auto mt-3 justify-content-center'>
                <Col xs lg='4'>
                    <Pagination className='justify-content-center'>{paginations}</Pagination>
                </Col>
            </Row>
        </div>
    )
}

export default PortalBookListing
