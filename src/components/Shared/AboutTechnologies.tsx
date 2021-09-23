import React from 'react'

const AboutTechnologies = () => {
    return (
        <section className='steps-wrapper'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <div className='step-wrapper'>
                            <div className='step step-1'>
                                <div className='step-name'>Mongo</div>
                                <div className='step-title'>
                                    <i className='icon icon-customize'></i>Database
                                </div>

                                <div className='step-arrow'></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='step-wrapper'>
                            <div className='step step-2'>
                                <div className='step-name'>Express</div>
                                <div className='step-title'>
                                    <i className='icon icon-implement'></i>Express is a minimal and
                                    flexible Node.js
                                </div>

                                <div className='step-arrow'></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='step-wrapper'>
                            <div className='step step-3'>
                                <div className='step-name'>React</div>
                                <div className='step-title'>
                                    <i className='icon icon-optimize'></i>Fontend
                                </div>

                                <div className='step-arrow'></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='step-wrapper'>
                            <div className='step step-4'>
                                <div className='step-name'>Node</div>
                                <div className='step-title'>
                                    <i className='icon icon-earn'></i>Node.js® is a JavaScript
                                    runtime built on Chrome's V8 JavaScript engine.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutTechnologies
