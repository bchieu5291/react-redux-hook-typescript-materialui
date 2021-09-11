import { ErrorMessage } from "formik";
import React from "react";
import { Form, FormCheck, FormGroup } from "react-bootstrap";
import { FormFeedback } from "reactstrap";

interface Props {
    field?: any;
    form?: any;

    type: string;
    label: string;
    placeholder: string;
    disabled: boolean;
}

const defaultProps: Props = {
    type: "text",
    label: "",
    placeholder: "",
    disabled: false,
};

const InputField = (props: Props) => {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <Form.Group>
            {label && <label>{label}</label>}
            <Form.Control
                id={name}
                {...field}
                placeholder="eg: news title"
                type={type}
                isInvalid={showError}
            />
            <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
        </Form.Group>
    );
};

InputField.defaultProps = defaultProps;

export default InputField;
