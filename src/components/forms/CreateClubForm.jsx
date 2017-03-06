import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, slug } from 'utils/form_validation/errors'
import {
  FieldSet,
  FieldLabel,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  RangePicker,
  Switch,
  Select,
  RadioGroup,
  TimePicker,
  ImageUploader,
  FileUploader
} from 'components/form_controls'

const CreateClubForm = ({ handleSubmit, createForm }) => {

  const slugString = (createForm && createForm.values && createForm.values.slug) ?
    createForm.values.slug : '<your id here>'

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLabel required={true}>Club Name</FieldLabel>
        <Field
          name="club.name"
          type="text"
          help="What is the name of your club?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
        <FieldLabel required={true}>Club Link</FieldLabel>
        <Field
          name="slug"
          type="text"
          help={`Enter a unique link for your club to use (http://openclub.co/${slugString}).`}
          validate={[required, slug]}
          component={Input}
        />
        <FieldLabel>Test Checkbox</FieldLabel>
        <Field
          name="checker"
          label="Check this box darnit"
          component={Checkbox}
        />
        <FieldLabel>Test Checkbox Group</FieldLabel>
        <Field
          name="checkergroup"
          options={[
            { label: 'Option One', value: 'option_one' },
            { label: 'Option Two', value: 'option_two' }
          ]}
          component={CheckboxGroup}
        />
        <FieldLabel>Test Date Selector</FieldLabel>
        <Field
          name="singledate"
          component={DatePicker}
          size="large"
        />
        <FieldLabel>Test Multi Date Selector</FieldLabel>
        <Field
          name="rangedate"
          size="large"
          component={RangePicker}
        />
        <FieldLabel>Test Time Picker</FieldLabel>
        <Field
          name="thetime"
          component={TimePicker}
        />
        <FieldLabel>Test Switch</FieldLabel>
        <Field
          name="switchy"
          component={Switch}
        />
        <FieldLabel>Test Radio Button</FieldLabel>
        <Field
          name="radiogo"
          component={RadioGroup}
          options={[
            { label: 'First Radio', value: 3 },
            { label: 'Second Radio', value: 'yes' }
          ]}
        />
        <FieldLabel>Test Image Uploader</FieldLabel>
        <Field
          name="profiletest"
          component={ImageUploader}
        />
        <FieldLabel>Test File Uploader</FieldLabel>
        <Field
          name="regfiles"
          component={FileUploader}
        />
        <FieldLabel>Test Select</FieldLabel>
        <Field
          name="someselect"
          component={Select}
          options={[
            { key: 'shiftyfive', value: 'Select Option One' },
            { key: 'wotwot', value: 'Another option' }
          ]}
        />
        <FieldLabel>Test MultiSelect</FieldLabel>
        <Field
          name="multime"
          component={Select}
          multiple
          options={[
            { key: 'mary', value: 'Mary' },
            { key: 'john', value: 'John' }
          ]}
        />
        <Button type="primary" htmlType="submit">Submit</Button>
      </FieldSet>
    </form>
  )
}

const CreateClubReduxForm = reduxForm({
  form: 'create_club'
})(CreateClubForm)

// connect the current form data so we can use it to display the slug name
export default connect(state => ({
  createForm: state.form.create_club,
  initialValues: {
    checker: false,
    checkergroup: {
      option_one: true
    }
  }
}))(CreateClubReduxForm)
