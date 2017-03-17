import React, { Component, PropTypes } from 'react';
import { Link } from 'teardrop';
import cx from 'classnames';

class ResponsiveMenuItem extends Component {
  static propTypes = {
    to: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    badge: PropTypes.number,
    active: PropTypes.bool
  }
  render() {
    const { to, icon, title, subtitle, badge, active } = this.props;
    const mdaListClasses = cx({
      'mda-list-item': true,
      'bg-primary': active
    });
    return (
      <Link to={to} className={mdaListClasses}>
        <div className="mda-list-item-icon bg-primary">
          <i className={icon} />
        </div>
        <div className="mda-list-item-text mda-2-line">
          <h3>
            {title}
            {badge && badge > 0 ? <span className="pull-right nav-label"><span className="badge bg-danger">{badge}</span></span> : <span />}
          </h3>
          <h4>{subtitle}</h4>
        </div>
      </Link>
    );
  }
}
export default ResponsiveMenuItem;
