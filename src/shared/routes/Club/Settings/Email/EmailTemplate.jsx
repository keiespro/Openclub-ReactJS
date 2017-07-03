import React, { Component } from 'react';
import { ContentPage } from 'components/layout';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import {
  Form,
  FieldContainer,
  MonthPicker,
  Input,
  Select,
  Address,
  Button,
  ImageUploader,
  FileUploader
} from 'components/form_controls'
import { Field, reduxForm } from 'redux-form'

class EmailTemplate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Form>
        <ContentPage>
          <h4 className="bottom-gap">Email Templates</h4>
          <p>OpenClub uses customised email templates to personalise your member communication.</p>
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <h5 className="pb">Defaults</h5>
              <p>OpenClub will use these defaults on all emails sent on behalf of your club.</p>
              <FieldContainer title="From Name" required>
                <Field
                  help="From name to appear on emails"
                  type="text"
                  name="settings.email_templates.from_name"
                  component={Input}
                  validate={[required, maxLength(64)]}
                  />
              </FieldContainer>
            </div>
          </div>
        </ContentPage>
      </Form>
    );
  }
}
const query = gql`
  query club($slug: String!) {
    club(slug: $slug) {
      _id
      settings{
        email_templates{
          from_name
          from_email
          from_signature
          welcome_template
          renewal_template
          invitation_template
        }
      }
    }
  }
`

const mutation = gql`
  mutation updateClub($clubId: MongoID!, $club: clubUpdate!){
    updateClub(clubId: $clubId, club: $club){
      _id
      settings{
        email_templates{
          from_name
          from_email
          from_signature
          welcome_template
          renewal_template
          invitation_template
        }
      }
    }
  }
`

const EmailTemplateReduxForm = reduxForm(props => ({
  name: 'email_template',
  initialValues: props.club
}))(EmailTemplate);

const EmailTemplateApollo = compose(
  graphql(query, {
    options: props => ({
      varibales: {
        slug: props.club.slug
      }
    })
  }),
  graphql(mutation, {
    name: 'updateEmails'
  })
)(EmailTemplateReduxForm);

export default EmailTemplateApollo;
