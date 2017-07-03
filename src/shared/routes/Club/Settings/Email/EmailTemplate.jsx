import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Tabs, { TabPane } from 'antd/lib/tabs';
import message from 'antd/lib/message';
import modal from 'antd/lib/modal';

// Components
import { ContentPage } from 'components/layout';
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'
import error from 'utils/error';
import Loading from 'components/Loading/Loading';
import {
  Form,
  FieldContainer,
  Input,
  Editor
} from 'components/form_controls'

class EmailTemplate extends Component {
  static propTypes = {
    club: PropTypes.object,
    handleSubmit: PropTypes.func,
    updateClub: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.state = {
      view: ''
    }
  }
  static submitChanges(values, dispatch, props) {
    const { updateClub, club } = props

    // get clean value object and image diff
    const realValues = stringKeyObjectFilter(values, props.registeredFields)

    updateClub({
      variables: {
        clubId: club._id,
        club: realValues
      }
    }).then(() => {
      message.success('Email Template Updated', 4)
    }).catch(err => {
      modal.error({
        title: 'Uh-oh!',
        content: error(err)
      });
    })
  }
  render() {
    const { club, handleSubmit, initialValues } = this.props;

    if (!initialValues) return <Loading />

    return (
      <Form onSubmit={handleSubmit}>
        <ContentPage>
          <div className="row mb">
            <div className="col-xs-12">
              <h3 className="bottom-gap">Email Templates</h3>
              <p>Customise your email templates to provide a more personal experience to your members.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <h4 className="pb">Defaults</h4>
              <p className="mb">These defaults will be used on any emails sent on behalf of your club.</p>
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
                  help="Default signature on system messages."
                  component={Editor}
                  name="settings.email_templates.from_signature"
                  />
              </FieldContainer>
              <button type="submit" className="btn btn-lg btn-primary">Save Templates</button>
            </div>
            <div className="col-xs-12 col-md-8">
              <h4 className="pb">Email Templates</h4>
              <p>Customise your email templates to create a more personal membership experience.<br />
              <small><a href="https://help.openclub.co/SOME HELP ARTICLE" target="_blank" rel="noopener noreferrer">Learn how to use Email Templates</a>.</small></p>
              <Tabs>
                <TabPane tab={`Welcome to ${club.name}`} key="1">
                  <Field
                    help="Email sent to members when their membership is activated."
                    component={Editor}
                    name="settings.email_templates.welcome_template"
                    />
                </TabPane>
                <TabPane tab={`${club.name} Membership Invitation`} key="2">
                  <Field
                    help="Email sent when inviting somebody to your club."
                    component={Editor}
                    name="settings.email_templates.invitation_template"
                    />
                </TabPane>
                <TabPane tab={`${club.name} Renewal`} key="3">
                  <Field
                    help="Email sent when somebody's renewal is due."
                    component={Editor}
                    name="settings.email_templates.renewal_template"
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

const EmailTemplateReduxForm = reduxForm({
  form: 'email_template',
  onSubmit: EmailTemplate.submitChanges
})(EmailTemplate);

const EmailTemplateApollo = compose(
  graphql(query, {
    options: props => ({
      variables: {
        slug: props.club.slug
      }
    }),
    skip: props => !props.club,
    props: ({ data, ...rest }) => ({
      initialValues: data.club,
      ...rest
    })
  }),
  graphql(mutation, {
    name: 'updateClub'
  })
)(EmailTemplateReduxForm);

export default EmailTemplateApollo;
