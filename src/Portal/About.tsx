import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PublicTemplate from 'components/Template/PublicTemplate'
import programmeImage from '../assets/programme.png'
import waveBanner from '../assets/banner-wave.png'
import ContactUs from 'components/Shared/ContactUs'

const About = () => {
    return (
        <PublicTemplate>
            <section id='banner'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 text-center'>
                            <p className='promo-title'>George Developer</p>
                            <p>Experience in Umbraco, Sitefinity, Nodejs, ReactJs</p>
                        </div>
                        <div className='col-md-6 text-center'>
                            <img src={programmeImage} className='img-fluid' alt='' />
                        </div>
                    </div>
                </div>
                <img alt='' src={waveBanner} className='bottom-img' />
            </section>

            <section id='services'>
                <div className='container mt-5 text-center'>
                    <h1 className='title'>What I Do?</h1>
                    <div className='row text-center mt-5'>
                        <div className='col-md-6'>
                            <h4>Web developer</h4>
                            <p>Umbraco, Sitefinity, ReactJs</p>
                        </div>
                        <div className='col-md-6'>
                            <h4>Mobile developer</h4>
                            <p>React Cordova, React Native</p>
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs />
        </PublicTemplate>
    )
}

export default About
