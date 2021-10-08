import React, { useContext, useState, useEffect } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import learItLogo from 'assets/logo.svg'
import logoutLogo from 'assets/logout.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import ReactFlagsSelect from 'react-flags-select'

const NavbarV2 = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext)

    const [t, i18n] = useTranslation('common')
    const [selected, setSelected] = useState('US')
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        const language = localStorage.getItem('i18nextLng')
        if (language) {
            if (language === 'en') setSelected('US')
            if (language === 'vi') setSelected('VN')
        }
    }, [])

    const onChangeLanguage = (code: any) => {
        setSelected(code)
        localStorage.setItem('language', code)
        if (code === 'US') i18n.changeLanguage('en')
        if (code === 'VN') i18n.changeLanguage('vi')
    }

    return (
        <Navbar expand='lg' expanded={expanded} bg='primary' variant='dark' className='sticky-top'>
            <Navbar.Brand className='font-weight-bold text-white'>
                <img src={learItLogo} alt='learnItLogo' width='32' height='32' className='mr-2' />
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls='basic-navbar-nav'
                onClick={() => setExpanded(!expanded)}
            />
            <Navbar.Collapse
                id='basic-navbar-nav'
                data-toggle='collapse'
                data-target='.navbar-collapse'
            >
                <Nav className='mr-auto'>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/portal'
                        as={Link}
                        onClick={() => setExpanded(false)}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/portal/user'
                        as={Link}
                        onClick={() => setExpanded(false)}
                    >
                        {t('user')}
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/portal/news'
                        as={Link}
                        onClick={() => setExpanded(false)}
                    >
                        {t('home.news')}
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/portal/book'
                        as={Link}
                        onClick={() => setExpanded(false)}
                    >
                        {t('book')}
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/portal/resize-image'
                        as={Link}
                        onClick={() => setExpanded(false)}
                    >
                        Resize Image
                    </Nav.Link>
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
                </Nav>
                <Nav>
                    <Nav.Link className='font-weight-bolder text-white' disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant='secondary'
                        className='font-weight-bolder text-white'
                        onClick={logoutUser}
                    >
                        <img
                            src={logoutLogo}
                            alt='logoutLogo'
                            width='32'
                            height='32'
                            className='mr-2'
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarV2
