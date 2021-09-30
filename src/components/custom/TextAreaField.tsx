import { ErrorMessage } from 'formik'
import React from 'react'
import { Form, FormCheck, FormGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FormFeedback } from 'reactstrap'
import { getTextContent4Multilanguage } from 'ultilities/helper'

interface Props {
    field?: any
    form?: any

    type: string
    label: string
    placeholder: string
    disabled: boolean
    isMultiLanguage: boolean
}

const defaultProps: Props = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    isMultiLanguage: false,
}

const TextAreaField = (props: Props) => {
    const { field, form, type, label, placeholder, disabled } = props
    const { name, value, onChange, onBlur } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]

    const [t, i18n] = useTranslation('common')

    return (
        <Form.Group>
            <div>{label && <label>{label}</label>}</div>

            <textarea
                className='form-control'
                id={name}
                {...field}
                value={getTextContent4Multilanguage(value, i18n.language)}
                placeholder={placeholder}
            />
            <div className={showError ? 'is-invalid' : ''}></div>
            <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
        </Form.Group>
    )
}

TextAreaField.defaultProps = defaultProps

export default TextAreaField
