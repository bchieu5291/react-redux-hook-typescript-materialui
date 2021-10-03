import SingleBook from 'components/books/SingleBook'
import { BookContext } from 'contexts/BookContext'
import React, { useContext } from 'react'
import { Button, Col, OverlayTrigger, Tooltip, Pagination, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import addIcon from 'assets/plus-circle-fill.svg'
import AddBookModal from './../components/books/AddBookModal'
import UpdateBookModal from './../components/books/UpdateBookModal'
import qs from 'querystring'
import { useHistory, useLocation } from 'react-router-dom'
import { ClassificationContext } from 'contexts/ClassificationContext'

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
        getBook(params.title, params.page ? (parseInt(params.page) - 1) * 3 : 0, undefined)
        window.scrollTo(0, 0)
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
