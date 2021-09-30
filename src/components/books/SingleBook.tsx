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
            <div>
                <Image
                    style={{ maxWidth: 150 }}
                    className='news-item-image'
                    src={`${book.imageFile.imageUrl.replace('-original', '-related')}`}
                />
            </div>
            <Col className='w-auto d-flex felx-column'>
                <Card.Body>
                    <Card.Title>
                        {getTextContent4Multilanguage(book.title, i18n.language)}
                    </Card.Title>
                    {/* <Card.Subtitle>Card subtitle</Card.Subtitle> */}
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
