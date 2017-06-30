import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import gql from 'graphql-tag'
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import { Group as CheckboxGroup } from 'antd/lib/checkbox';
import message from 'antd/lib/message';
import _ from 'lodash';
import Spin from 'antd/lib/spin';
import error from 'utils/error';
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
import { ThemeField } from 'components/custom_form_fields'

class ClubProfileForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    token: PropTypes.string,
    submitting: PropTypes.bool,
    club: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      loading: ''
    }
  }
  async submitChange(club) {
    const { updateClub } = this.props;

    try {
      message.loading('Updating...', 20);
      await updateClub({
        variables: {
          clubId: this.props.club._id,
          club
        }
      })
      message.destroy();
      message.success('Done', 5);
      this.setState({ loading: '' })
    } catch (err) {
      message.destroy();
      message.error(error(err.message), 20);
      this.setState({ loading: '' })
    }
  }
  submitSetting(field, value) {
    let club = {};
    _.set(club, field, value);
    this.setState({ loading: field })
    this.submitChange(club);
  }
  render() {
    const { handleSubmit, token, submitting, club } = this.props;

    const minimumAgeOptions = [
      { value: '0', title: 'All ages allowed' },
      { value: '13', title: '13 and older' },
      { value: '17', title: '17 and older' },
      { value: '18', title: '18 and older' },
      { value: '21', title: '21 and older' },
      { value: '23', title: '23 and older' },
      { value: '25', title: '25 and older' },
      { value: '30', title: '30 and older' },
      { value: '40', title: '40 and older' },
      { value: '50', title: '50 and older' },
      { value: '60', title: '60 and older' }
    ]

    return (
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <h4 className="bottom-gap">Logo & Theme</h4>
              <FieldContainer title="Theme">
                <Field
                  name="settings.theme"
                  component={ThemeField}
                />
              </FieldContainer>
            <FieldContainer title="Profile Image">
              <Field
                name="images.square"
                component={ImageUploader}
                token={token}
                postname="square"
                aspect={1}
                action={`${process.env.ICEPICK_URL}/upload/image/square`}
              />
            </FieldContainer>
            <FieldContainer title="Background Image">
              <Field
                name="images.background"
                token={token}
                postname="background"
                action={`${process.env.ICEPICK_URL}/upload/image/background`}
                aspect={100 / 37}
                component={ImageUploader}
              />
            </FieldContainer>
          </div>
          <div className="col-xs-12 col-md-4">
            <h4 className="bottom-gap">About & Profile</h4>
              <FieldContainer required title="Name">
                <Field
                  name="name"
                  type="text"
                  help="Name of your community as it appears on OpenClub"
                  validate={[required, maxLength(64)]}
                  component={Input}
                />
              </FieldContainer>
            <FieldContainer title="About">
              <Field
                name="details.about"
                type="textarea"
                rows={6}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="Club Location">
              <Field
                name="details.location"
                help="What city or suburb is the club located in?"
                validate={[maxLength(64)]}
                component={Address}
                types={['(regions)']}
              />
            </FieldContainer>
            <FieldContainer title="Year Founded">
              <Field
                name="details.founded"
                component={MonthPicker}
              />
            </FieldContainer>
            <FieldContainer title="Contact Email">
              <Field
                name="details.email"
                type="text"
                help="What is the best club contact email?"
                validate={[email]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="Contact Phone Number">
              <Field
                name="details.phone"
                type="number"
                help="What is the best club contact phone number?"
                validate={[phone]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="Club Website">
              <Field
                name="details.website"
                type="text"
                help="What is the url of your club website?"
                validate={[url]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="Facebook">
              <Field
                addonBefore="facebook.com/"
                name="details.facebook"
                type="text"
                help="What is the url of your clubs facebook page?"
                validate={[slug, maxLength(128)]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="Instagram">
              <Field
                addonBefore="@"
                name="details.instagram"
                type="text"
                help="What is the user id of your clubs instagram account?"
                validate={[maxLength(64)]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="LinkedIn">
              <Field
                addonBefore="linkedin.com/company/"
                name="details.linkedin"
                type="text"
                help="What is the url of your clubs linkedin page?"
                validate={[slug, maxLength(128)]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="Twitter">
              <Field
                addonBefore="@"
                name="details.twitter"
                type="text"
                help="What is the id of your clubs twitter user account?"
                validate={[maxLength(32)]}
                component={Input}
              />
            </FieldContainer>
          </div>
          <div className="col-xs-12 col-md-4">
            <h4 className="bottom-gap">Preferences</h4>
            <FieldContainer required title="Age Restriction">
              <Field
                name="details.minimum_age"
                component={Select}
                help="Restrict people under a certain age from joining your community."
                options={minimumAgeOptions}
              />
            </FieldContainer>
            <FieldContainer required title="Community Privacy">
              <Field
                name="settings.directory_privacy"
                component={Select}
                help="Control the visibility of your members list"
                options={[{ value: 'public', title: 'Visible to OpenClub users' }, { value: 'private', title: 'Visible to this community only' }]}
              />
            </FieldContainer>
            <h4 className="top-gap bottom-gap">Post Privacy</h4>
            <p className="bottom-gap">
              The news feed allows your members to post content, questions, events and more. The feed is the starting point for members to engage with your club.
            </p>
            <FieldContainer title="Public Feed Permissions">
              <p className="mb">Set feed permissions for OpenClub users and the public.</p>
              <Spin spinning={this.state.loading === 'settings.feed_public_permissions'}>
                <CheckboxGroup
                  options={[
                    { value: 'view', label: 'View feed' },
                    { value: 'post', label: 'Post to feed' }
                  ]}
                  value={_.get(club, 'settings.feed_public_permissions', ['view', 'post'])}
                  onChange={val => this.submitSetting('settings.feed_public_permissions', val)}
                  />
              </Spin>
            </FieldContainer>
            <FieldContainer title="Member Feed Permissions">
              <p className="mb">Set feed permissions for your members.</p>
              <Spin spinning={this.state.loading === 'settings.feed_permissions'}>
                <CheckboxGroup
                  options={[
                    { value: 'view', label: 'View feed' },
                    { value: 'post', label: 'Post to feed' }
                  ]}
                  value={_.get(club, 'settings.feed_permissions', ['view', 'post'])}
                  onChange={val => this.submitSetting('settings.feed_permissions', val)}
                  />
              </Spin>
            </FieldContainer>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center">
            {submitting ? <button disabled className="btn btn-lg btn-primary">Saving...</button> : <button type="submit" className="btn btn-lg btn-primary">Save Details</button>}
          </div>
        </div>
      </Form>
    )
  }
}

const mutation = gql`
  mutation updateClub($clubId: MongoID!, $club: clubUpdate!){
    updateClub(clubId: $clubId, club: $club){
      _id
      settings{
        directory_privacy
        feed_permissions
        feed_public_permissions
      }
    }
  }
`

const ClubProfileFormApollo = graphql(mutation, {
  name: 'updateClub'
})(ClubProfileForm)


const ClubProfileReduxForm = reduxForm({
  form: 'create_club'
})(ClubProfileFormApollo)

export default connect(state => ({
  token: state.auth.token
}))(ClubProfileReduxForm)
