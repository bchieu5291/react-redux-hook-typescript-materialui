import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import { UserForm } from "requestModel/AuthForm";
import { Redirect, Route } from "react-router-dom";
import NavbarV2 from "components/Shared/NavbarV2";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <NavbarV2></NavbarV2>
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        ></Route>
    );
};

export default ProtectedRoute;
