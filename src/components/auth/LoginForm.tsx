import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { UserForm } from "requestModel/AuthForm";
import AlertMessage, { IAlert } from "components/Shared/AlertMessage";

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
                Don't have account?
                <Link to="/register">
                    <Button variant="info" size="sm" type="submit" className="ml-2">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
