import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ErrorMessage } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FormFeedback } from 'reactstrap'
import { getLongTextContent4Multilanguage, getTextContent4Multilanguage } from 'ultilities/helper'
const { CKEditor } = require('@ckeditor/ckeditor5-react')

interface Props {
    field?: any
    form?: any

    type: string
    label: string
    placeholder: string
    disabled: boolean
}

const defaultProps: Props = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
}

const CKEditorField = (props: Props) => {
    const { field, form, type, label, placeholder, disabled } = props
    const { name, value, onChange, onBlur } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]

    const [t, i18n] = useTranslation('common')

    return (
        <Form.Group>
            {label && <label>{label}</label>}
            <CKEditor
                editor={ClassicEditor}
                data={getTextContent4Multilanguage(value, i18n.language)}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData()
                    form.setFieldValue('description', data)
                }}
                onFocus={(event: any, editor: any) => {
                    editor.ui.view.editable.element.style.minHeight = '200px'
                    editor.ui.view.editable.element.style.backgroundColor = 'black'
                }}
            ></CKEditor>
            <div className={showError ? 'is-invalid' : ''}></div>
            <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
        </Form.Group>
    )
}

CKEditorField.defaultProps = defaultProps

export default CKEditorField
