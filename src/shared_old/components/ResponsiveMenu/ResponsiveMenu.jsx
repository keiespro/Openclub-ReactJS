import React, { PropTypes, Component, Children, cloneElement } from 'react';
import ResponsiveMenuItem from './ResponsiveMenuItem';

class ResponsiveMenu extends Component {
  static contextTypes = {
    router: PropTypes.func.isRequired
  }
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ])
  }
  isActive(to) {
    return this.context.router.isActive(to);
  }
  render() {
    const { children } = this.props;

    return (
      <div className="card">
        <div className="mda-list mda-list-bordered">
          {
            Children.map(children, (child) => {
              if (child.type === ResponsiveMenuItem) {
                const { to } = child.props;
                return cloneElement(<ResponsiveMenuItem />, {
                  active: this.isActive(to),
                  ...child.props
                });
              }
              return null;
            })
          }
        </div>
      </div>
    );
  }
}
export default ResponsiveMenu;
