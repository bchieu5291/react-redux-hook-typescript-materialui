import addIcon from 'assets/plus-circle-fill.svg'
import InputField from 'components/custom/InputField'
import SelectDropdownField from 'components/custom/SelectDropdownField'
import AddNewsModal from 'components/news/AddNewsModal'
import SingleNews from 'components/news/SingleNews'
import UpdateNewsModal from 'components/news/UpdateNewsModal'
import { ClassificationContext } from 'contexts/ClassificationContext'
import { NewsContext } from 'contexts/NewsContext'
import { Field, Form, Formik, FormikProps } from 'formik'
import qs from 'querystring'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, OverlayTrigger, Pagination, Row, Tooltip } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { OptionsType } from 'react-select'
import { Classification } from 'reducers/classificationReducer'

const NewsListing = () => {
    const [selectedClassifications, setSelectedClassifications] = useState<
        OptionsType<Classification>
    >([])

    //router
    var router = useHistory()

    //context
    const {
        newsState: { newsListing, newsListingLoading, newsDetail, totalPages, currentPage, total },
        getNews,
        setShowAddNewsModal,
    } = useContext(NewsContext)
    const {
        getClassifications,
        classifcationState: { classificationsLoading, classifications },
    } = useContext(ClassificationContext)

    const location = useLocation()

    //Start: Get classification
    useEffect(() => {
        getClassifications()
    }, [])

    const formikRef = useRef<any>(null)

    //Get all news when url change
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        getNews(
            params.title,
            params.classifications,
            params.page ? parseInt(params.page) : 0,
            undefined
        )
        window.scrollTo(0, 0)
        // initialValues.title = params.title;

        // initialValues.classifications =
        //     params.classifications?.split(",").map(
        //         (t) =>
        //             ({
        //                 value: t,
        //             } as Classification)
        //     ) ?? [];
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

    const handlePagination = (page: number) => {
        const queryParams = qs.parse(location.search.replace('?', ''))
        const newQueries = { ...queryParams, page: page }
        router.push({ search: qs.stringify(newQueries) })
    }

    let body = null
    body = (
        <>
            <Row className='row-cols-12 g-4 mx-auto mt-3'>
                {newsListing.map((news) => (
                    <Col key={news._id} className='my-2 news-item'>
                        <SingleNews {...news} />
                    </Col>
                ))}
            </Row>

            {/* {Open Modal} */}
            <OverlayTrigger
                placement='left'
                overlay={<Tooltip id='tool-tip-add-post'>Add a new thing to learn</Tooltip>}
            >
                <Button className='btn-floating' onClick={setShowAddNewsModal.bind(this, true)}>
                    <img src={addIcon} alt='addPost' width='60' height='60' />
                </Button>
            </OverlayTrigger>
        </>
    )

    let paginations = []
    for (let i = 0; i < totalPages; i++) {
        const isActive = currentPage === i + 1

        paginations.push(
            <Pagination.Item key={i} active={isActive} onClick={handlePagination.bind(this, i + 1)}>
                {i + 1}
            </Pagination.Item>
        )
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
                                            placeholder='news title'
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

    return (
        <div>
            {filter}
            {newsDetail !== null && <UpdateNewsModal />}
            <AddNewsModal />
            {body}
            <Row className='row-cols-12 g-4 mx-auto mt-3 justify-content-center'>
                <Col xs lg='4'>
                    <Pagination className='justify-content-center'>{paginations}</Pagination>
                </Col>
            </Row>
        </div>
    )
}

export default NewsListing
