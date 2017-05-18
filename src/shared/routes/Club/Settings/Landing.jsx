import React, { Component, PropTypes } from 'react';
import Button from 'antd/lib/button';
import Select, { Option } from 'antd/lib/select';
import Spin from 'antd/lib/spin';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import message from 'antd/lib/message';
import la from 'logandarrow'

// Components
import { Form, Checkbox, FieldContainer } from 'components/form_controls';

// Helpers
import { stringKeyObjectFilter } from 'utils/object_helpers';
import error from 'utils/error';

class SettingsLanding extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    club: PropTypes.object,
    updateClub: PropTypes.func
  }
  constructor(props) {
    super(props)

    this.state = {
      loading: ''
    }
  }
  async submitChange(club) {
    const { updateClub } = this.props;

    try {
      message.loading('Updating...', 20);
      const returns = await updateClub({
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
    const { club } = this.props;
    const { transitionTo } = this.context.router;

    return (
      <Form>
        <h5 className="bottom-gap">News Feed</h5>
        <hr className="bottom-gap" />
        <div className="bottom-gap-large">
          <p className="bottom-gap">The news feed allows your members to post content, questions, events and more. The feed is the starting point for members to engage with your club.</p>
          <FieldContainer title="Public Feed Permissions">
            <Spin spinning={this.state.loading === 'settings.feed_public_permissions'}>
              <Select onChange={val => this.submitSetting('settings.feed_public_permissions', val)} value={_.get(club, 'settings.feed_public_permissions', ['view', 'post'])} mode="tags">
                <Option key="view" value="view">View and like posts</Option>
                <Option key="post" value="post">Post and comment</Option>
              </Select>
            </Spin>
          </FieldContainer>
          <FieldContainer title="Member Feed Permissions">
            <Spin spinning={this.state.loading === 'settings.feed_permissions'}>
              <Select onChange={val => this.submitSetting('settings.feed_permissions', val)} value={_.get(club, 'settings.feed_permissions', ['view', 'post'])} mode="tags">
                <Option key="view" value="view">View and like posts</Option>
                <Option key="post" value="post">Post and comment</Option>
              </Select>
            </Spin>
          </FieldContainer>
        </div>
        <h5 className="bottom-gap">Club Directory</h5>
        <hr className="bottom-gap" />
        <div className="bottom-gap-large">
          <p className="bottom-gap">
            Provide information that will be displayed to your members and the public.
            This information will help people find your club within OpenClub, and on the web.
          </p>
          <FieldContainer>
            <Spin spinning={this.state.loading === 'settings.directory_privacy'}>
              <Checkbox
                input={{
                  value: _.get(club, 'settings.directory_privacy', 'public') === 'public',
                  onChange: val => this.submitSetting('settings.directory_privacy', val ? 'public' : 'private')
                }}
                label={_.get(club, 'settings.directory_privacy', 'public') === 'public' ? 'Directory is visible publicly' : 'Directory is visible to members only'}
                isSwitch
                />
            </Spin>
          </FieldContainer>
          <small>OpenClub protects the privacy of its users by protecting certain information from being indexed.
          Members can choose to withhold certain details or to hide their profile from the directory at their own discretion.</small>
        </div>
        <h5 className="bottom-gap">Profile</h5>
        <hr className="bottom-gap" />
        <div className="bottom-gap-large">
          <p className="bottom-gap">Provide information that will be displayed to your members and the public.
          This information will help people find your club within OpenClub, and on the web.</p>
        <Button type="primary" onClick={transitionTo.bind(this, `/${club.slug}/settings/profile`)} icon="edit">Edit Profile</Button>
        </div>
        <h5 className="bottom-gap">Membership Plans</h5>
        <hr className="bottom-gap" />
        <div className="bottom-gap-large">
          <p className="bottom-gap">Let people join your club by providing some membership plans.</p>
          <Button type="primary" onClick={transitionTo.bind(this, `/${club.slug}/settings/plans`)} icon="edit">Edit Plans</Button>
        </div>
        <h5 className="bottom-gap">Financial Details</h5>
        <hr className="bottom-gap" />
        <div className="bottom-gap-large">
          <p className="bottom-gap">Receive payments for your club membership payments and event tickets.</p>
          <Button type="primary" onClick={transitionTo.bind(this, `/${club.slug}/settings/payments`)} icon="credit-card">Setup Payments</Button>
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

const ClubSettingsApollo = graphql(mutation, {
  name: 'updateClub'
})(SettingsLanding)

export default ClubSettingsApollo;
