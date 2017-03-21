import stream from 'getstream';

const initStream = () => stream.connect(process.env.STREAM_API_KEY, null, process.env.STREAM_APP_ID);

const feedGroups = {
  CLUB: 'club',
  CLUB_NOTIFICATION: 'club_notification',
  EVENT: 'event',
  EVENT_NOTIFICATION: 'event_notification',
  TIMELINE: 'timeline',
  NOTIFICATIONS: 'notifications'
}

const subscribe = (feedContext, callback) => feedContext.subscribe(callback);
const unsubscribe = (subscription) => subscription.cancel();

const getFeed = (client, feedGroup, subscriberId, feedToken) => client.feed(feedGroup, subscriberId, feedToken);

export {
  initStream,
  feedGroups,
  subscribe,
  unsubscribe,
  getFeed
}
