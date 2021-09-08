import { Form, FormGroup, InputGroup } from "react-bootstrap";
import { default as Select } from "react-select";
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

    return (
        <Form.Group className="mb-3">
            {label && <label>{label}</label>}
            <Select
                value={value}
                classNamePrefix="filter"
                options={props.options}
                isMulti={true}
                onChange={(selectedOption) => {
                    form.setFieldValue("classifications", selectedOption);
                }}
            />
        </Form.Group>
    );
};

SelectDropdownField.defaultProps = defaultProps;

export default SelectDropdownField;
