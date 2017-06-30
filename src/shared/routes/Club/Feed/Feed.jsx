import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet'
import NewsFeed from 'components/newsfeed/NewsFeed';
import PostPage from 'components/newsfeed/PostPage'
import { ContentPage, PageHeader } from 'components/layout';
import { TextInfoIcon } from 'components/display';
import { MatchGroup, Match, Link } from 'teardrop';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Alert from 'antd/lib/alert';
import _ from 'lodash';
import moment from 'moment';

// WIDGETS
import ClubInviteWidget from 'components/widgets/ClubInviteWidget'

class Feed extends Component {
  static propTypes = {
    club: PropTypes.object,
    viewer: PropTypes.object,
    location: PropTypes.object,
    perm: PropTypes.object
  }
  render() {
    const { club, viewer, location, perm, slug } = this.props;

    let minAge = 'This club has no age restrictions on members'
    if (club.details && club.details.minimum_age && club.details.minimum_age !== '0'){
      minAge = `This club has a ${club.details.minimum_age}+ age restriction`
    }

    let aboutText = null
    if (club.details && club.details.about){
      aboutText = club.details.about.split('\n')
    }

    const regex = /^\/[\w\d]+\/feed\/([\w\d]+)/;
    let firstPostId;

    if (regex.test(location.pathname)) {
      let match = location.pathname.match(regex)[1];
      firstPostId = match;
    }
    return (
      <div>
        <Helmet title={`${club.name}`} />
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <ContentPage largeFont>
              <PageHeader title={club.name} />
              <div>
                {aboutText ?
                aboutText.map((i, k) => (<span key={k}>{i}<br/></span>)) :
                (perm.userCanUpdateDetails ? <Alert
                  message={(
                    <span>The about text has not been entered for this club. Go to <Link to={`/${club.slug}/settings/profile`}>Settings</Link> to update the club profile.</span>
                  )}
                  type="info"
                  showIcon
                /> : null)}
              </div>
            </ContentPage>

            <ContentPage largeFont>
              <PageHeader title="Details" />
              {club.details && club.details.location &&
                <TextInfoIcon icon="calendar" title="Location">
                  {club.details.location.formatted_address}
                </TextInfoIcon>
              }
              {club.details && club.details.founded &&
                <TextInfoIcon icon="calendar" title="Founded">
                  Club was founded in <b>{moment(club.details.founded).format('MMMM, YYYY')}</b>
                </TextInfoIcon>
              }
              <TextInfoIcon icon="user" title="Minimum Age">
                {minAge}
              </TextInfoIcon>
            </ContentPage>
            <MatchGroup>
              <Match pattern={`/${slug}/feed`} render={() => <NewsFeed feedOwnerId={_.get(club, '_id')} feedOwnerType="clubs" slug={slug} viewer={viewer} firstPostId={firstPostId} perm={perm} />} />
              <Match pattern={`/${slug}/feed/post/:post_id`} render={params => <PostPage perm={perm} viewer={viewer} {...params} />} />
            </MatchGroup>
          </Col>
          <Col lg={8} className="hidden-xs hidden-sm hidden-md">
            {viewer && <ClubInviteWidget club={club} />}
            <ContentPage largeFont>
              <PageHeader title="Contact Details" />
              { club.details && club.details.email &&
                <TextInfoIcon icon="mail" title="Club Enquiries Email">
                  <a href={`mailto:${club.details.email}`}>{club.details.email}</a>
                </TextInfoIcon>
              }
              { club.details && club.details.phone &&
                <TextInfoIcon icon="phone" title="Club Enquiries Phone">
                  {club.details.phone}
                </TextInfoIcon>
              }
              { club.details && club.details.website &&
                <TextInfoIcon icon="global" title="Club Website">
                  <a href={club.details.website} target="_blank">{club.details.website}</a>
                </TextInfoIcon>
              }
              { club.details && club.details.facebook &&
                <TextInfoIcon icon="like-o" title="Facebook">
                  <a href={`http://www.facebook.com/${club.details.facebook}`} target="_blank">fb.me/{club.details.facebook}</a>
                </TextInfoIcon>
              }
              { club.details && club.details.instagram &&
                <TextInfoIcon icon="picture" title="Instagram">
                  <a href={`http://www.instagram.com/${club.details.instagram}`} target="_blank">@{club.details.instagram}</a>
                </TextInfoIcon>
              }
              { club.details && club.details.linkedin &&
                <TextInfoIcon icon="contacts" title="LinkedIn">
                  <a href={`http://www.linkedin.com/company/${club.details.linkedin}`} target="_blank">linkedin.com/company/{club.details.linkedin}</a>
                </TextInfoIcon>
              }
              { club.details && club.details.twitter &&
                <TextInfoIcon icon="heart-o" title="Twitter">
                  <a href={`http://www.twitter.com/${club.details.twitter}`} target="_blank">@{club.details.twitter}</a>
                </TextInfoIcon>
              }
            </ContentPage>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Feed
