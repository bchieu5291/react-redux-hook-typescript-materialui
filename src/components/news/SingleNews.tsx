import ActionButtons from 'components/posts/ActionButtons'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { News } from 'reducers/newsReducer'
import { getLongTextContent4Multilanguage, getTextContent4Multilanguage } from 'ultilities/helper'

const SingleNews = (news: News) => {
    const regex = /(<([^>]+)>)/gi
    const [t, i18n] = useTranslation('common')

    const createMakeup = (htmlText: string) => {
        return { __html: htmlText }
    }

    return (
        <Row className='news-single-row'>
            <Col>
                <Card>
                    <Row className='no-gutters'>
                        <Col md='3'>
                            <Card.Img
                                className='news-item-image'
                                variant='top'
                                src={`${news.imageFile.imageUrl}`}
                            />
                        </Col>
                        <Col md='9'>
                            <Card.Body>
                                <Card.Title>
                                    {getTextContent4Multilanguage(news.title, i18n.language)}
                                </Card.Title>
                                {/* <Card.Subtitle>Card subtitle</Card.Subtitle> */}
                                <Card.Text>
                                    {getLongTextContent4Multilanguage(
                                        news.description,
                                        i18n.language,
                                        150
                                    )}
                                </Card.Text>
                                <Card.Text>
                                    {news.classifications &&
                                        news.classifications.length > 0 &&
                                        'Classification: ' +
                                            news.classifications
                                                .map((item) => item.title)
                                                .join(', ')}
                                </Card.Text>
                            </Card.Body>
                            <Row className='no-gutters'>
                                <Col className='text-right'>
                                    <ActionButtons {...news} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default SingleNews
