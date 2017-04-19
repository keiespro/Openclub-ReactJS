import React, { Component, PropTypes } from 'react';
import Button from 'antd/lib/button';

class SettingsLanding extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    club: PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  render() {
    const { club } = this.props;
    const { transitionTo } = this.context.router;
    return (
      <div>
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
      </div>
    )
  }
}
export default SettingsLanding;
