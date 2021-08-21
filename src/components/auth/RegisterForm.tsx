import AlertMessage, { IAlert } from "components/Shared/AlertMessage";
import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { IRegisterForm, UserForm } from "requestModel/AuthForm";

const RegisterForm = () => {
    //state
    const [registerForm, setRegiosterForm] = useState<IRegisterForm>({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [alert, setAlert] = useState<IAlert>({
        type: "",
        message: "",
    });

    //router
    const history = useHistory();

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event: React.FormEvent<HTMLInputElement>) =>
        setRegiosterForm({
            ...registerForm,
            [event.currentTarget.name]: event.currentTarget.value,
        });

    //useContext
    const { registerUser } = useContext(AuthContext);

    const register = async (event: any) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Passwords do not match" });
            setTimeout(() => {
                setAlert({ type: "", message: "" });
            }, 3000);
            return;
        }

        try {
            const registerResponse = await registerUser(registerForm);
            if (!registerResponse.success) {
                setAlert({ type: "danger", message: registerResponse.message });
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
            <Form className="my-4" onSubmit={register}>
                <AlertMessage {...alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={(event) => onChangeRegisterForm(event as any)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={(event) => onChangeRegisterForm(event as any)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(event) => onChangeRegisterForm(event as any)}
                    ></Form.Control>
                </Form.Group>
                <Button variant="success" type="submit">
                    RegisterForm
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" type="submit" className="ml-2">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
