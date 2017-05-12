import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { seenNotifications } from 'modules/notifications/actions'
import { Button, Table, Icon } from 'antd'
import { objectIcon } from 'constants/index'
import cx from 'classnames'
import _ from 'lodash'
import './NotificationTable.scss'
import la from 'logandarrow';

class Notifications extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  static propTypes = {
    data: PropTypes.object,
    max: PropTypes.number,
    seen: PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  goTo(link) {
    this.context.router.transitionTo(link);
  }
  render() {
    const findTarget = (value) => {
      let target = _.get(value, 'activities[0].target_data.name') || _.get(value, 'activities[0].target_data.slug') || _.get(value, 'activities[0].target');
      if (typeof target === 'string') {
        if (!_.endsWith(target, "'s'") && _.endsWith(target, "s")) {
          target = `${target}'`
        } else {
          target = `${target}'s`;
        }
      }
      return target || 'your';
    }
    const findObjectName = (value) => _.get(value, 'activities[0].object_data.type') || 'content';
    const getLink = (value) => {
      let type = _.get(value, 'activities[0].object_data.type');
      let slug = _.get(value, 'activities[0].object_data.slug');
      let ownerType = _.get(value, 'activities[0].object_data.owner_type');
      let postId = _.get(value, 'activities[0].object');

      if (type === 'club') return `/${slug}`;
      if (type === 'event') return `/events/${slug}/${postId}`;
      if (type === 'post') return `/${ownerType === 'event' ? 'events/' + slug : slug}/feed/post/${postId}`;
      if (type === 'feed') return `/${slug}/feed`;
      return false;
    }
    const formatActors = (value) => {
      const actorIndex = (index) => _.get(value, `activities[${index}].actor_data.name`) || 'Unknown';
      if (!value.activity_count) {
        return value.actor_data.name || value.actor || 'Unknown'
      }
      if (value.activity_count === 1) {
        return actorIndex(0);
      }
      if (value.activity_count === 2) {
        return `${actorIndex(0)} and ${actorIndex(1)}`
      }
      if (value.activity_count > 2) {
        const remaining = value.activity_count - 2
        const personOrPeople = remaining === 1 ? 'person' : 'people'
        return `${actorIndex(0)}, ${actorIndex(1)} and ${remaining} other ${personOrPeople}`
      }
    }

    const { data, max } = this.props
    let { notifications } = data;

    if (!notifications || notifications.length <= 0) {
      return <div className="text-center">No new notifications.</div>
    }
    notifications = _.filter(notifications, n => _.has(n, 'activities[0].actor_data') && _.has(n, 'activities[0].object_data'));
    if (max && notifications) notifications = notifications.slice(0, max)


    const onRowClick = record => this.goTo(getLink(record));
    const rowKey = record => record.id;
    const rowClassName = record => cx({ 'notification-unseen': !record.is_seen });
    const recordImg = record => record.activities && record.activities.length > 0 && 'img' in record.activities[0] ? record.activities[0].img : (record.img || false);
    const notificationCols = [
      {
        key: 'icon',
        width: '32px',
        render: (text, record) => <div className="notification-icon">{recordImg(record) ? <img alt="Icon" className="notification-image" src={recordImg(record)} /> : <Icon type={objectIcon(record.object)} />}</div>
      },
      {
        key: 'notification',
        render: (text, record) => <div>{`${formatActors(record)} ${record.verb} ${findTarget(record)} ${findObjectName(record)}`}</div>
      },
      {
        key: 'actions',
        render: (text, record) => <div className="pull-right"><Button shape="circle" type="primary" ghost icon="arrow-right" onClick={onRowClick.bind(this, record.id)} /></div>
      }
    ]

    return <Table rowKey={rowKey} rowClassName={rowClassName} onRowClick={onRowClick} pagination={false} showHeader={false} columns={notificationCols} dataSource={notifications} onMouseOver={this.markAsSeen} />
  }
}

export default connect(state => ({
  data: state.notifications
}), {
  seen: seenNotifications
})(Notifications);
