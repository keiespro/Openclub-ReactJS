import _ from 'lodash'

const clubPermissions = (club, viewer) => {
  let p = {
    clubHasPlans: false,
    clubHasPublicPlans: false,
    userIsAdmin: false,
    userIsMember: false,
    userIsFollower: false,
    userIsSubscribed: false,
    userCanAccessSettings: false,
    userCanJoin: false,
    userCanFollow: false,
    userCanPost: false,
    userCanUpdateDetails: false,
    userCanEditPlans: false,
    userCanSetupClub: false,
    userCanViewMembers: false,
    userCanViewDetailedMembers: false
  }

  if (!viewer) return p;
  // if (!viewer.memberships || viewer.memberships.length <= 0) return p;

  const mK = viewer ? _.findIndex(viewer.memberships, { club_id: club._id }) : false;
  const membership = mK !== false && mK > -1 ? viewer.memberships[mK] : {};
  console.log(club);
  // Club has plans
  p.clubHasPlans = club.membership_plans && club.membership_plans.length > 0;

  // Club has publicly available plans
  p.clubHasPublicPlans = p.clubHasPlans && _.findIndex(club.membership_plans, { public: true }) > -1;

  // User has admin permission
  p.userIsAdmin = (membership.roles || []).indexOf('admin') > -1;

  // User is member of club
  p.userIsMember = !!membership.subscription || p.userIsAdmin

  // User is follower of club
  p.userIsFollower = !!membership.following

  // User is follower of club
  p.userIsSubscribed = !!membership.notifications

  // User can access settings
  p.userCanAccessSettings = p.userIsAdmin;

  // User can access finances
  p.userCanAccessFinances = p.userIsAdmin || ((membership.roles || []).indexOf('accountant') > -1)

  // User can access members
  p.userCanAccessMembers = p.userIsAdmin || ((membership.roles || []).indexOf('curator') > -1)

  // User can moderate feed
  p.userCanModerateFeed = p.userIsAdmin || ((membership.roles || []).indexOf('moderator') > -1)

  // User can join club
  p.userCanJoin = p.clubHasPublicPlans && !p.userIsMember && !p.userIsAdmin

  // User can follow club
  p.userCanFollow = !p.userIsFollower

  // User can post to club
  p.userCanPost = p.userIsAdmin || p.userIsMember;

  // User can update club details
  p.userCanUpdateDetails = p.userIsAdmin;

  // User can edit plans
  p.userCanEditPlans = p.userIsAdmin;

  // User can setup club
  p.userCanSetupClub = p.userIsAdmin;

  // User can view members
  p.userCanViewMembers = p.userIsMember || p.userIsAdmin

  // User can view detailed members
  p.userCanViewDetailedMembers = p.userIsAdmin

  // Let's return the membership too, because it's useful
  p.membership = membership;
  return p;
}

export default clubPermissions;
