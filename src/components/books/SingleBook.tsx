import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IBook } from 'reducers/bookReducer'
import { getLongTextContent4Multilanguage, getTextContent4Multilanguage } from 'ultilities/helper'
import ActionButtons from 'components/posts/ActionButtons'

const SingleBook = (book: IBook) => {
    const [t, i18n] = useTranslation('common')
    return (
        <Row className='no-gutters'>
            <Col xs='4' md='1'>
                <Image
                    className='news-item-image p-2'
                    src={`${book.imageFile.imageUrl.replace('-original', '-related')}`}
                />
            </Col>
            <Col xs='8' md='11'>
                <Card.Body className='pt-1'>
                    <Card.Title>
                        {getTextContent4Multilanguage(book.title, i18n.language)}
                    </Card.Title>
                    <Card.Text>
                        {book.classifications &&
                            book.classifications.length > 0 &&
                            'Classification: ' +
                                book.classifications.map((item) => item.title).join(', ')}
                    </Card.Text>
                    <Card.Text className='d-none d-sm-block'>
                        {getLongTextContent4Multilanguage(book.description, i18n.language, 150)}
                    </Card.Text>
                </Card.Body>
                <Row className='no-gutters justify-content-end mt-auto'>
                    <div className='text-right'>
                        <ActionButtons {...book} />
                    </div>
                </Row>
            </Col>
        </Row>
    )
}

export default SingleBook
