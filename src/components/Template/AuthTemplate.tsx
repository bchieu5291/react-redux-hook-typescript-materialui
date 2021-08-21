import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";

interface Props {
    authRoute: string;
}

const AuthTemplate = ({ authRoute }: Props) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info"></Spinner>
            </div>
        );
    } else if (isAuthenticated) {
        return <Redirect to="/portal" />;
    } else {
        body = (
            <>
                {authRoute === "login" && <LoginForm />}
                {authRoute === "register" && <RegisterForm />}
            </>
        );
    }

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>George React Typescrtip</h1>
                    <h4>Keep track</h4>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default AuthTemplate;
