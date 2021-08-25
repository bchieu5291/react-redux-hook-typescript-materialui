import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { CKEditor } = require("@ckeditor/ckeditor5-react");

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

const CKEditorField = (props: Props) => {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <Form.Group>
            {label && <label>{label}</label>}
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    form.setFieldValue("description", data);
                }}
                onFocus={(event: any, editor: any) => {
                    editor.ui.view.editable.element.style.minHeight = "200px";
                    editor.ui.view.editable.element.style.backgroundColor = "black";
                }}
            ></CKEditor>
        </Form.Group>
    );
};

CKEditorField.defaultProps = defaultProps;

export default CKEditorField;
