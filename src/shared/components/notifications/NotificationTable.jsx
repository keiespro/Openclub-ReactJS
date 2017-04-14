import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { seenNotifications } from 'modules/notifications/actions'
import gql from 'graphql-tag'
import { ContentArea, ContentPage } from 'components/layout'
import { Button, Table, Icon } from 'antd'
import { objectIcon } from 'constants/index'
import cx from 'classnames'
import './NotificationTable.scss'

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

    this.dismiss = this.dismiss.bind(this);
  }
  goTo(link) {
    this.context.router.transitionTo(link.replace(/^\//, ''));
  }
  formatVerb(value) {
    const { verb } = value;
    switch (verb) {
      case 'like': return 'liked'; break;
      case 'test': return 'tested'; break;
      case 'comment': return 'commented on'; break;
      case 'join': return 'joined'; break;
      default: return 'performed an unknown activity'; break;
    }
  }
  dismiss(id) {
    return id;
  }
  findObject(value) {
    if (value.object) return value.object;
    if (value.activities && value.activities.constructor === Array && value.activities.length > 0) return value.activities[0].object || '';
  }
  formatActors(value) {
    if (!value.activity_count) {
      return value.actor || ''
    }
    if (value.activity_count === 1) {
      return value.activities[0].actor
    }
    if (value.activity_count === 2) {
      return `${value.activities[0].actor} and ${value.activities[0].actor}`
    }
    if (value.activity_count > 2) {
      const remaining = value.activity_count - 2
      const personOrPeople = remaining === 1 ? 'person' : 'people'
      return `${value.activities[0].actor}, ${value.activities[0].actor} and ${remaining} other ${personOrPeople}`
    }
  }
  render() {
    const { data, max } = this.props
    let { notifications } = data;

    if (!notifications || notifications.length <= 0) {
      return <div className="text-center">No new notifications.</div>
    }

    if (max && notifications) notifications = notifications.slice(0, max)

    const onRowClick = record => this.goTo.bind(this, record.link);
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
        render: (text, record) => <div>{`${this.formatActors(record)} ${record.verb} your ${this.findObject(record)}`}</div>
      },
      {
        key: 'actions',
        render: (text, record) => <div className="pull-right"><Button shape="circle" type="dashed" icon="check" onClick={this.dismiss.bind(this, record.id)} /></div>
      }
    ]

    return <Table rowKey={rowKey} rowClassName={rowClassName} onRowClick={onRowClick} pagination={false} showHeader={false} columns={notificationCols} dataSource={notifications} onMouseOver={this.markAsSeen}/>
  }
}

export default connect(state => ({
  data: state.notifications
}), {
  seen: seenNotifications
})(Notifications);
