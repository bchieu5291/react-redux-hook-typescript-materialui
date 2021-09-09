import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { UserForm } from "model/AuthForm";
import AlertMessage, { IAlert } from "components/Shared/AlertMessage";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
    //state
    const [loginForm, setLoginForm] = useState<UserForm>({
        username: "",
        password: "",
    });

    const [alert, setAlert] = useState<IAlert>({
        type: "",
        message: "",
    });

    //use translate
    const [t] = useTranslation("common");

    //router
    const history = useHistory();

    const { username, password } = loginForm;

    const onChangeLoginForm = (event: React.FormEvent<HTMLInputElement>) =>
        setLoginForm({ ...loginForm, [event.currentTarget.name]: event.currentTarget.value });

    //useContext
    const { loginUser } = useContext(AuthContext);

    const login = async (event: any) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                // history.push("/portal");
            } else {
                setAlert({ type: "danger", message: loginData.message });
                setTimeout(() => {
                    setAlert({ type: "", message: "" });
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage {...alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={(event) => onChangeLoginForm(event as any)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={(event) => onChangeLoginForm(event as any)}
                    ></Form.Control>
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                {t("dontHaveAccount")}
                <Link to="/register">
                    <Button variant="info" size="sm" type="submit" className="ml-2">
                        {t("register")}
                    </Button>
                </Link>
            </p>
            <p>
                <Link to="/">
                    <p>{t("backToHomepage")}</p>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
