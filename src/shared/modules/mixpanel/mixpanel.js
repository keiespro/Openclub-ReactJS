import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.MIXPANEL_TOKEN);

export default callback => {
  if (process.env.IS_SERVER) return false;
  callback(mixpanel);
}
