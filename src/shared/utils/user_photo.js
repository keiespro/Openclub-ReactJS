export default (user, preference = 'square') => {
  if (user && user.images && user.images[preference]) return user.images[preference];
  if (user && user.fbid) return `https://graph.facebook.com/${user.fbid}/picture?type=square&${preference === 'square' ? 'width=256&height=256' : 'width=64&height=64'}`;
  return '/blank.gif'
}
