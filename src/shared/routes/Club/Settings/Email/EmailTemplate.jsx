import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Tabs, { TabPane } from 'antd/lib/tabs';

// Components
import { ContentPage } from 'components/layout';
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import {
  Form,
  FieldContainer,
  Input,
  Editor
} from 'components/form_controls'

class EmailTemplate extends Component {
  static propTypes = {
    club: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      view: ''
    }
  }
  submitChanges() {

  }
  render() {
    const { club } = this.props;

    return (
      <Form>
        <ContentPage>
          <div className="row">
            <h4 className="bottom-gap">Email Templates</h4>
          </div>
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
              <FieldContainer title="From Email" required>
                <Field
                  help="From email address members can reply to"
                  type="text"
                  name="settings.email_templates.from_email"
                  component={Input}
                  validate={[required, email]}
                  />
              </FieldContainer>
              <FieldContainer title="Default Signature" required>
                <Field
                  help="Email sent to members when their membership is activated."
                  component={Editor}
                  name="settings.email_template.from_signature"
                  />
              </FieldContainer>
              <button type="submit" className="btn btn-lg btn-primary">Save Templates</button>
            </div>
            <div className="col-xs-12 col-md-8">
              <h5 className="pb">Email Templates</h5>
              <p>Customise your email templates to create a more personal membership experience.</p>
              <Tabs>
                <TabPane tab={`Welcome to ${club.name}`} key="1">
                  <Field
                    help="Email sent to members when their membership is activated."
                    component={Editor}
                    name="settings.email_template.welcome_template"
                    />
                </TabPane>
                <TabPane tab={`${club.name} Membership Invitation`} key="2">
                  <Field
                    help="Email sent to members when their membership is activated."
                    component={Editor}
                    name="settings.email_template.invitation_template"
                    />
                </TabPane>
                <TabPane tab={`${club.name} Renewal`} key="3">
                  <Field
                    help="Email sent to members when their membership is activated."
                    component={Editor}
                    name="settings.email_template.renewal_template"
                    />
                </TabPane>
              </Tabs>
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
  initialValues: props.club || {}
}))(EmailTemplate);

const EmailTemplateApollo = compose(
  graphql(query, {
    options: props => ({
      variables: {
        slug: props.club.slug
      }
    }),
    skip: props => !props.club
  }),
  graphql(mutation, {
    name: 'updateEmails'
  })
)(EmailTemplateReduxForm);

export default EmailTemplateApollo;
