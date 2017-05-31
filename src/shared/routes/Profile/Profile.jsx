import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Badge from 'antd/lib/badge';
import _ from 'lodash';
import { ContentArea, ContentPage } from 'components/layout'
import UserProfile from 'modules/forms/UserProfile'
import ManageCreditCards from 'modules/forms/ManageCreditCards'
import { MatchGroup, Match, Redirect } from 'teardrop';

class Profile extends Component {
  static propTypes = {
    viewer: PropTypes.object
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)

    this.anchors = {};
  }

  render() {
    const { viewer, location } = this.props;
    const match = location.pathname ? location.pathname.match(/^.*\/([\d\w-_]+)\/?/)[1] : 'profile';

    const menuClick = (e) => {
      if (e.key === 'profile') return this.context.router.transitionTo('/profile');
      return this.context.router.transitionTo(`/profile/${e.key}`);
    }

    if (!viewer) return <div>You must be logged in to view this page.</div>
    return (
        <ContentArea>
          <ContentPage>
            <div className="mb-xl">
              <Menu
                selectedKeys={[match]}
                onClick={menuClick}
                mode="horizontal"
              >
                <Menu.Item key="profile"><i className="fa fa-fw fa-list-ul" /> Profile Details</Menu.Item>
                <Menu.Item key="payment"><i className="fa fa-fw fa-credit-card" /> Payment Details</Menu.Item>
                <Menu.Item key="invitations"><i className="fa fa-fw fa-envelope-open-o" /> Invitations <Badge count={_.get(viewer, 'invitations', []).length} /></Menu.Item>
                <Menu.Item key="help"><i className="fa fa-fw fa-question-circle" /> Help</Menu.Item>
              </Menu>
            </div>
            <MatchGroup>
              <Match
                pattern="/profile"
                render={() => {
                  // Some variables
                  return (
                    <Row gutter={16}>
                      <Col xs={24} mg={8} lg={8} className="xs-hidden sm-hidden">
                        <div>
                          <h3>Profile Details</h3>
                          <hr className="mt-lg mb-lg" />
                          <h4 className="mb-sm">Portable</h4>
                          <p className="mb-sm">
                            Your OpenClub profile is portable between all of the clubs you join. When you update your information here, it will be reflected in all of the clubs connected to your account.
                          </p>
                          <h4 className="mb-sm">Privacy</h4>
                          <p className="mb-sm">
                            OpenClub will never share your private information, such as your date of birth or address, with club members or the public.
                            The only information that may be displayed is in the club directory, which you have full control over.
                          </p>
                          <h4 className="mb-sm">Date of Birth</h4>
                          <p className="mb-sm">
                            Your date of birth may be required to join some clubs with age restrictions. If you have not provided a date of birth, you will be unable to join age-restricted clubs.
                          </p>
                        </div>
                      </Col>
                      <Col xs={24} mg={16} lg={8}>
                        <div>
                          <h4 className="mb-sm">Profile</h4>
                          <UserProfile viewer={viewer} />
                        </div>
                      </Col>
                    </Row>
                  )
                }}
              />
              <Match
                pattern="/profile/payment"
                render={() => {
                  // Payment Details Page
                  return (
                    <Row gutter={16}>
                      <Col xs={24} mg={8} lg={8}>
                        <h3>Payment Details</h3>
                        <hr className="mt-lg mb-lg" />
                        <h4 className="mb-sm">Overview</h4>
                        <p className="mb-sm">OpenClub can support up to 5 payment sources per person. The card details are stored on secure servers, and your card data can never be seen by anybody using or within OpenClub.</p>
                        <h4 className="mb-sm">Primary Card</h4>
                        <p className="mb-sm">If you have more than one card, you may set a primary card - the primary card will be the default selected card for any manual payments, and will be the default card when processing automatic renewals. If you do not wish to automatically renew a subscription, please turn off automatic renewals via your club's membership page.</p>
                      </Col>
                      <Col xs={24} mg={16} lg={8}>
                        <h4 className="mb-sm">Credit Cards</h4>
                        <ManageCreditCards viewer={viewer} />
                      </Col>
                    </Row>
                  )
              }}
              />
              <Match
                pattern="/profile/invitations"
                render={() => {
                  return <div>Coming Soon</div>
                }}
                />
              <Match pattern="/profile/help" render={() => <Redirect to="/help" />} />
            </MatchGroup>
          </ContentPage>
        </ContentArea>
    );
  }
}
export default Profile;
