import _ from 'lodash';

export default function (viewer, feed) {
  if (!feed) return [];
  let basePermissions = feed ? feed.public_permissions || [] : [];
  console.log(basePermissions);

  if (viewer && viewer.memberships) {
    let index = _.findIndex(viewer.memberships, { club_id: feed.owner._id });
    let membership = viewer.memberships[index];
    console.log(index, membership);

    if (membership) {
      basePermissions = [...basePermissions, ...(feed ? feed.permissions || [] : [])];
      if (membership.feed_permissions instanceof Array) {
        basePermissions = [...basePermissions, ...membership.feed_permissions];
      }
    }
  }

  // Look for ANTI-PERMISSIONS
  let antiPermissionR = /^!(.*)/;
  let antiPermissions = basePermissions.map(p => antiPermissionR.test(p) ? p.match(antiPermissionR)[1] : null);
  console.log(antiPermissions);

  basePermissions = _.difference(basePermissions, antiPermissions);
  console.log(basePermissions);
  return basePermissions;
}
