export const setup = async () => {
  if (process.env.IS_SERVER) return null;
  window.mixpanel = await System.import('mixpanel-browser');
  window.mixpanel.init(process.env.MIXPANEL_TOKEN);
}

export const tracking = cb => process.env.IS_CLIENT ? cb(window.mixpanel) : false;
