import React from "react";
import { Form, FormGroup } from "react-bootstrap";

interface Props {
    field?: any;
    form?: object;

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

    return (
        <Form.Group>
            {label && <label>{label}</label>}
            <Form.Control id={name} {...field} placeholder="eg: news title" type={type} />
        </Form.Group>
    );
};

InputField.defaultProps = defaultProps;

export default InputField;
