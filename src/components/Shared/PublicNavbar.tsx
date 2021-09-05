import React from "react";
import { Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand to="/" as={Link} className="text-white">
                    G-Dev
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="font-weight-bolder text-white" to="/login" as={Link}>
                            News
                        </Nav.Link>
                        <Nav.Link
                            className="font-weight-bolder text-white"
                            href="http://nextjs.georgedev.info"
                            target="_blank"
                        >
                            NextJS
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="font-weight-bolder text-white" to="/login" as={Link}>
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default PublicNavbar;
