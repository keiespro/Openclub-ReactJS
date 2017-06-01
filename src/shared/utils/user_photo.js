import _ from 'lodash';

export default (user, preference = 'square') => _.get(user, 'square.location', _.get(user, 'square', _.get(user, 'fbid') ? `https://graph.facebook.com/${_.get(user, 'fbid')}/picture?type=square&${preference === 'square' ? 'width=256&height=256' : 'width=64&height=64'}` : '/blank.gif'))
