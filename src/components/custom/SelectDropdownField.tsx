import { ErrorMessage } from "formik";
import { Form, FormGroup, InputGroup } from "react-bootstrap";
import { default as Select } from "react-select";
import { FormFeedback } from "reactstrap";
import { Classification } from "reducers/classificationReducer";

interface Props {
    field?: any;
    form?: any;

    label: string;
    placeholder: string;
    disabled: boolean;
    options: Classification[];
}

const defaultProps: Props = {
    label: "",
    placeholder: "",
    disabled: false,
    options: [],
};

const SelectDropdownField = (props: Props) => {
    const { field, form, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <Form.Group className="mb-3">
            {label && <label>{label}</label>}
            <Select
                value={props.options.filter((t) => value.some((z: any) => z.value === t.value))}
                //value={value}
                classNamePrefix="filter"
                options={props.options}
                isMulti={true}
                onChange={(selectedOption) => {
                    form.setFieldValue("classifications", selectedOption);
                }}
                className={showError ? "is-invaid" : ""}
            />
            <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
        </Form.Group>
    );
};

SelectDropdownField.defaultProps = defaultProps;

export default SelectDropdownField;
