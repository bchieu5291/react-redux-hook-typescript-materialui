import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import learItLogo from "assets/logo.svg";
import logoutLogo from "assets/logout.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";

const NavbarV2 = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
            <Navbar.Brand className="font-weight-bold text-white">
                <img src={learItLogo} alt="learnItLogo" width="32" height="32" className="mr-2" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="font-weight-bolder text-white" to="/portal" as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to="/about" as={Link}>
                        About
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to="/portal/news" as={Link}>
                        News
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="font-weight-bolder text-white" disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant="secondary"
                        className="font-weight-bolder text-white"
                        onClick={logoutUser}
                    >
                        <img
                            src={logoutLogo}
                            alt="logoutLogo"
                            width="32"
                            height="32"
                            className="mr-2"
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarV2;
