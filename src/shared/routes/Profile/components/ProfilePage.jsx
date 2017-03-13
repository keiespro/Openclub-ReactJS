import React, { Component, PropTypes } from 'react';
import { ResponsiveMenu, ResponsiveMenuItem } from 'components/ResponsiveMenu';

class ProfilePage extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ])
  }
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    return (
      <section>
        <div className="container-overlap bg-primary p0 pb-lg pt-lg">
          <div className="text-center">
            <h5 className="mb-xl">Profile</h5>
          </div>
        </div>

        <div className="container-fluid">
          <div className="col-xs-12 col-md-4">
            <div className="card">
              <div className="card-body p0">
                <ResponsiveMenu>
                  <ResponsiveMenuItem
                    to="#"
                    icon="fa fa-list"
                    title="Personal details"
                    subtitle="Update your personal details"
                  />
                </ResponsiveMenu>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-8">
            <div className="card">
              <div className="card-body">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default ProfilePage;
