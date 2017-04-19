import React, { Component, PropTypes } from 'react'
import { Menu, Col, Row } from 'antd'
import { ContentArea, ContentPage } from 'components/layout'
import UserProfile from 'modules/forms/UserProfile'
import ManageCreditCards from 'modules/forms/ManageCreditCards'

class Profile extends Component {
  static propTypes = {
    viewer: PropTypes.object
  }
  constructor(props) {
    super(props)

    this.anchors = {};
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(e) {
    this.anchors[e.key].scrollIntoView();
  }
  render() {
    const { viewer } = this.props;
    return (
        <ContentArea>
            <ContentPage>
              <Row gutter={20}>
                <Col xs={{span: 0}} md={{span: 6}}>
                  <Menu
                    onClick={this.menuClick}
                    mode="inline"
                  >
                  <Menu.ItemGroup key="sub1" title={<span>Profile Settings</span>}>
                    <Menu.Item key="overview">Overview</Menu.Item>
                    <Menu.Item key="profile">Portable Profile</Menu.Item>
                    <Menu.Item key="payment">Payment Details</Menu.Item>
                  </Menu.ItemGroup>
                  </Menu>
                </Col>
                <Col xs={{span: 24}} md={{span: 18}}>
                  <h3 className="bottom-gap-large" id="overview" ref={overview => { this.anchors.overview = overview }}>OpenClub Profile</h3>
                  <hr className="bottom-gap" />
                  <div className="bottom-gap-large">
                    <p>OpenClub securely stores your data and only shares certain bits with the clubs that you join. Your payment details are never shared and are stored securely with us.</p>
                  </div>
                  <hr className="bottom-gap-large" />
                    <h3 className="bottom-gap" ref={profile => { this.anchors.profile = profile }}>Portable Profile</h3>
                    <hr className="bottom-gap" />
                    <div className="bottom-gap-large">
                      <p className="bottom-gap">This is your portable profile. This data is shared with clubs you join. Your profile phot and name may appear publicly if you post on a public wall.</p>
                      <UserProfile viewer={viewer} />
                    </div>
                    <h3 className="bottom-gap-large" id="payment" ref={payment => { this.anchors.payment = payment }}>Payment Details</h3>
                    <hr className="bottom-gap" />
                    <ManageCreditCards viewer={viewer} />
                </Col>
              </Row>
            </ContentPage>
        </ContentArea>
    );
  }
}
export default Profile;
