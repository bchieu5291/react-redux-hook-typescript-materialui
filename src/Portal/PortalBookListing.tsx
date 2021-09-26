import SingleBook from 'components/books/SingleBook'
import { BookContext } from 'contexts/BookContext'
import React, { useContext } from 'react'
import { Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useEffect } from 'react'
import addIcon from 'assets/plus-circle-fill.svg'
import AddBookModal from './../components/books/AddBookModal'

const PortalBookListing = () => {
    //context
    const {
        bookState: { bookListing, bookListingLoading, totalPages, currentPage, total },
        getBook,
        setShowAddBookModal,
    } = useContext(BookContext)

    useEffect(() => {
        getBook()
    }, [])

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

    return (
        <div>
            <AddBookModal />
            {body}
        </div>
    )
}

export default PortalBookListing
