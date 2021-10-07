import ImagePopup from 'components/Shared/ImagePopup'
import PublicTemplate from 'components/Template/PublicTemplate'
import React from 'react'
import { useState } from 'react'

const ReactNativeExperience = () => {
    const [imagePopup, setImagePopup] = useState({ open: false, imageUrl: '' })

    const onImageClick = (data: any) => {
        console.log(data)
        setImagePopup({ open: true, imageUrl: data })
    }

    return (
        <PublicTemplate>
            <section id='react-native-experience' className='pb-0'>
                <div className='container'>
                    <h1>G-Book</h1>
                    <div className='row'>
                        <div className='col-md-8'>
                            <p>Download and read book with device app</p>
                            <p>Fitler book</p>
                        </div>
                        <div className='col-md-4'>
                            <img
                                src='https://g-node-test.s3.ap-southeast-1.amazonaws.com/bookImage/gbook1.jpg'
                                alt=''
                                className='w-50 p-2'
                                onClick={onImageClick.bind(
                                    this,
                                    'https://g-node-test.s3.ap-southeast-1.amazonaws.com/bookImage/gbook1.jpg'
                                )}
                            />
                            <img
                                src='https://g-node-test.s3.ap-southeast-1.amazonaws.com/bookImage/gbook2.jpg'
                                alt=''
                                className='w-50 p-2'
                                onClick={onImageClick.bind(
                                    this,
                                    'https://g-node-test.s3.ap-southeast-1.amazonaws.com/bookImage/gbook2.jpg'
                                )}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {imagePopup.open === true && (
                <ImagePopup
                    imageUrl={imagePopup.imageUrl}
                    onClick={() => setImagePopup({ open: false, imageUrl: '' })}
                />
            )}
        </PublicTemplate>
    )
}

export default ReactNativeExperience
