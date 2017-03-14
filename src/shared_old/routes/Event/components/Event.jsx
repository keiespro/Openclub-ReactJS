import React, { Component, PropTypes } from 'react';
import { ObjectPageHeader } from 'components/Pages/ObjectPage';
import { MenuBar, MenuBarItem } from 'components/HorizontalMenuBar';
import { Grid } from 'react-bootstrap';

class EventComponent extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    event: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    // syncEvent: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // componentWillMount() { //FIXME
  //   this.props.syncEvent(this.props.params.event_id);
  // }
  render() {
    const { event, children, params, location } = this.props;
    const path = `/event/${params.event_id}`;

    const collapseHeader = (location.pathname === path || location.pathname === `${path}/`) === false;

    return (
      <section>
        <ObjectPageHeader
          {...event}
          collapsed={collapseHeader}
        />
        <MenuBar routePrefix={path} route={location}>
          <MenuBarItem label={event.name} to="/" />
          <MenuBarItem label="Attendees" to="/attendees" />
          <MenuBarItem divider />
          <MenuBarItem label="Prices" to="/prices" />
          <MenuBarItem label="Check-in" to="/check-in" />
          <MenuBarItem label={<i className="fa fa-gear" />} to="/settings" />
          <button className="btn btn-danger menu-btn-inner pull-right ripple pl-xl pr-xl">
            Buy Tickets
          </button>
        </MenuBar>
        <Grid fluid>
          {children}
        </Grid>
      </section>
    );
  }
}
export default EventComponent;
