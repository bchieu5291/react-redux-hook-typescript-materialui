import ActionButtons from 'components/posts/ActionButtons'
import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { News } from 'reducers/newsReducer'
import { getLongTextContent4Multilanguage, getTextContent4Multilanguage } from 'ultilities/helper'

const SingleNews = (news: News) => {
    const [t, i18n] = useTranslation('common')

    return (
        <Row className='no-gutters'>
            <Col md='3'>
                <Image
                    className='news-item-image'
                    src={`${news.imageFile.imageUrl.replace('-original', '-restNews')}`}
                />
            </Col>
            <Col md='9'>
                <Card.Body>
                    <Card.Title>
                        {getTextContent4Multilanguage(news.title, i18n.language)}
                    </Card.Title>
                    {/* <Card.Subtitle>Card subtitle</Card.Subtitle> */}
                    <Card.Text className='d-none d-sm-block'>
                        {getLongTextContent4Multilanguage(news.description, i18n.language, 150)}
                    </Card.Text>
                    <Card.Text>
                        {news.classifications &&
                            news.classifications.length > 0 &&
                            'Classification: ' +
                                news.classifications.map((item) => item.title).join(', ')}
                    </Card.Text>
                </Card.Body>
                <Row className='no-gutters justify-content-end'>
                    <div className='text-right'>
                        <ActionButtons {...news} />
                    </div>
                </Row>
            </Col>
        </Row>
    )
}

const blogImageStyle = {}

export default SingleNews
