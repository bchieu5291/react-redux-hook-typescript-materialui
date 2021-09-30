import ContactUs from 'components/Shared/ContactUs'
import PublicTemplate from 'components/Template/PublicTemplate'
import React from 'react'
import myAvatar from 'assets/my-avatar.jpg'
import sussImage from 'assets/suss.png'
import xpomaniaImage from 'assets/xpomania.png'
import mrbillImage from 'assets/mrbill.png'
import bwImage from 'assets/bw.png'
import pokkaImage from 'assets/pokka.png'
import nusgameImage from 'assets/nusgame.png'
import { useState } from 'react'
import ImagePopup from 'components/Shared/ImagePopup'

const MyExpericence = () => {
    const [imagePopup, setImagePopup] = useState({ open: false, imageUrl: '' })

    const onImageClick = (data: any) => {
        console.log(data)
        setImagePopup({ open: true, imageUrl: data })
    }

    return (
        <PublicTemplate>
            <section id='my-profile' className='pb-0'>
                <div className='container'>
                    <h1>Hieu (George) Bui</h1>
                    <div className='row'>
                        <div className='col-md-8'>
                            <p>4 years of experience in .Net application developer </p>
                            <p>2 years of experience in Cordova + ReactJS </p>
                            <p>
                                2 years work with Sitefinity CMS and has a certificate version 11{' '}
                            </p>
                            <p>2 years work with Umbraco CMS </p>
                            <p>2 years work with ReactJs, NodeJs </p>
                            <p>
                                Experience in MongoDB, AWS EC2, AWS S3, AWS Translate, Postgre,
                                Graphql, Typescipt, Firebase, Signal R, Docker, CI/CD Github Action,
                                Selenium, Nextjs, React Native{' '}
                            </p>
                        </div>
                        <div className='col-md-4'>
                            <img src={myAvatar} alt='' className='my-avatar' />
                        </div>
                    </div>
                </div>
            </section>
            <section id='my-project-work' className='pb-0'>
                <div className='container'>
                    <h2>My project work</h2>
                    <div className='row'>
                        <div className='col-md-4 d-inline'>
                            <div className='imgHolder'>
                                <img
                                    src={bwImage}
                                    alt=''
                                    className='my-project-item'
                                    onClick={onImageClick.bind(this, bwImage)}
                                />
                                <div className='wrapper-text'>
                                    <p className='my-project-label mb-0'>BW</p>
                                </div>
                            </div>
                            <p className='text-center'>Backend (Sitefinity)</p>
                        </div>
                        <div className='col-md-4'>
                            <div className='imgHolder'>
                                <img
                                    src={sussImage}
                                    alt=''
                                    className='my-project-item'
                                    onClick={onImageClick.bind(this, sussImage)}
                                />
                                <div className='wrapper-text'>
                                    <p className='my-project-label mb-0'>SUSS</p>
                                </div>
                            </div>
                            <p className='text-center'>Backend (Sitefinity)</p>
                        </div>
                        <div className='col-md-4'>
                            <div className='imgHolder'>
                                <img
                                    src={mrbillImage}
                                    alt=''
                                    className='my-project-item'
                                    onClick={onImageClick.bind(this, mrbillImage)}
                                />
                                <div className='wrapper-text'>
                                    <p className='my-project-label mb-0'>Mrbill</p>
                                </div>
                            </div>
                            <p className='text-center'>Fullstack (.NET, Cordova)</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 d-inline'>
                            <div className='imgHolder'>
                                <img
                                    src={xpomaniaImage}
                                    alt=''
                                    className='my-project-item'
                                    onClick={onImageClick.bind(this, xpomaniaImage)}
                                />
                                <div className='wrapper-text'>
                                    <p className='my-project-label mb-0'>XPO Mania</p>
                                </div>
                            </div>
                            <p className='text-center'>Backend (Umbraco)</p>
                        </div>
                        <div className='col-md-4 d-inline'>
                            <div className='imgHolder'>
                                <img
                                    src={pokkaImage}
                                    alt=''
                                    className='my-project-item'
                                    onClick={onImageClick.bind(this, pokkaImage)}
                                />
                                <div className='wrapper-text'>
                                    <p className='my-project-label mb-0'>Pokka</p>
                                </div>
                            </div>
                            <p className='text-center'>Backend (Sitefinity)</p>
                        </div>
                        <div className='col-md-4 d-inline'>
                            <div className='imgHolder'>
                                <img
                                    src={nusgameImage}
                                    alt=''
                                    className='my-project-item'
                                    onClick={onImageClick.bind(this, nusgameImage)}
                                />
                                <div className='wrapper-text'>
                                    <p className='my-project-label mb-0'>NUS</p>
                                </div>
                            </div>
                            <p className='text-center'>Backend (Umbraco)</p>
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs />
            {imagePopup.open === true && (
                <ImagePopup
                    imageUrl={imagePopup.imageUrl}
                    onClick={() => setImagePopup({ open: false, imageUrl: '' })}
                />
            )}
        </PublicTemplate>
    )
}

export default MyExpericence
