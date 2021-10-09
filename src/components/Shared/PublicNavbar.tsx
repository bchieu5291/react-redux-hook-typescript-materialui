import React, { useEffect, useState } from 'react'
import { Container, Dropdown, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ReactFlagsSelect from 'react-flags-select'
import { useLocation } from 'react-router-dom'

const PublicNavbar = () => {
    const [t, i18n] = useTranslation('common')
    const [selected, setSelected] = useState('US')

    useEffect(() => {
        const language = localStorage.getItem('i18nextLng')
        if (language) {
            if (language === 'en') setSelected('US')
            if (language === 'vi') setSelected('VN')
        }
    }, [])

    const location = useLocation()

    const isExperience = location.pathname === '/my-experience' && 'font-weight-bolder'
    const isAbout = location.pathname === '/about' && 'font-weight-bolder'
    const isReactNativeExperience =
        location.pathname === '/react-native-experience' && 'font-weight-bolder'

    const onChangeLanguage = (code: any) => {
        setSelected(code)
        localStorage.setItem('language', code)
        if (code === 'US') i18n.changeLanguage('en')
        if (code === 'VN') i18n.changeLanguage('vi')
    }

    return (
        <Navbar bg='secondary' expand='lg' variant='dark' className='sticky-top'>
            <Navbar.Brand to='/' as={Link} className='text-white'>
                G-Dev
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link className={`${isAbout} text-white`} to='/about' as={Link}>
                        {t('about')}
                    </Nav.Link>
                    <Nav.Link
                        className={`${isExperience} text-white`}
                        to='/my-experience'
                        as={Link}
                    >
                        {t('experience')}
                    </Nav.Link>
                    <Nav.Link
                        className={`${isReactNativeExperience} text-white`}
                        to='/react-native-experience'
                        as={Link}
                    >
                        {t('home.reactNative')}
                    </Nav.Link>
                    <NavDropdown
                        id='nav-dropdown-dark-example'
                        title='Demo projects'
                        className='text-white'
                    >
                        <NavDropdown.Item
                            className='text-white'
                            href='http://nextjs.georgedev.info'
                            target='_blank'
                        >
                            NextJS
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            className='text-white'
                            href='http://umbraco.georgedev.info'
                            target='_blank'
                        >
                            Umbraco
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            className='text-white'
                            href='http://vue.georgedev.info'
                            target='_blank'
                        >
                            Vue
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <ReactFlagsSelect
                        selected={selected}
                        className='country-languages '
                        countries={['US', 'VN']}
                        customLabels={{ US: 'USA', VN: 'Vietnam' }}
                        placeholder='Select Language'
                        onSelect={(code: any) => onChangeLanguage(code)}
                    />
                    <Nav.Link className='font-weight-bolder text-white' to='/login' as={Link}>
                        {t('home.login')}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default PublicNavbar
