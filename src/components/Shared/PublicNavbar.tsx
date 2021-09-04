import React from "react";
import { Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Nav.Link className="navbar-brand pl-0" to="/" as={Link}>
                    G-Dev
                </Nav.Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!">
                                Contact
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                News
                            </a>
                        </li>
                        <Nav.Link
                            className="font-weight-bolder text-white login-btn"
                            to="/login"
                            as={Link}
                        >
                            Login
                        </Nav.Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
