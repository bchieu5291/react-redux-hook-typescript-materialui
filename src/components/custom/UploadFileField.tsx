import { ErrorMessage } from "formik";
import React, { ReactEventHandler } from "react";
import { Form, FormGroup, InputGroup } from "react-bootstrap";
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

const UploadFileField = (props: Props) => {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const invalidClass = showError ? "is-invaid" : "";

    return (
        <Form.Group className="mb-3">
            {label && <label>{label}</label>}
            <InputGroup className="mb-3">
                <InputGroup.Text>Choose File</InputGroup.Text>
                <input
                    id={name}
                    name={name}
                    type={type}
                    className={`form-control ${invalidClass}`}
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const files = event.target.files as FileList;
                        let myFiles = Array.from(files);
                        form.setFieldValue("image", myFiles);
                    }}
                />
                <div className={showError ? "is-invalid" : ""}></div>
                <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
            </InputGroup>
        </Form.Group>
    );
};

UploadFileField.defaultProps = defaultProps;

export default UploadFileField;
