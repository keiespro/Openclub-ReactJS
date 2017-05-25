import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Card from 'antd/lib/card';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from 'antd/lib/button';
import clubPermissions from 'utils/club_permissions';
import FeedItem from './FeedItem';
import './NewsFeed.scss';

import la from 'logandarrow';

class AggregatedNewsFeed extends Component {
  static propTypes = {
    data: PropTypes.object,
    viewer: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.paginate = this.paginate.bind(this);
  }
  async paginate() {
    const { data } = this.props;
    const { fetchMore } = data;
    const cursor = _.get(data, 'aggregateFeed.posts.page_info.next_page_cursor');

    if (cursor) {
      await fetchMore({
        variables: {
          first: 15,
          cursor
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return la()({
            ...prev,
            ...fetchMoreResult,
            aggregateFeed: {
              ...prev.aggregateFeed,
              ...fetchMoreResult.aggregateFeed,
              posts: {
                ...prev.aggregateFeed.posts,
                ...fetchMoreResult.aggregateFeed.posts,
                edges: _.uniqBy([...prev.aggregateFeed.posts.edges, ...fetchMoreResult.aggregateFeed.posts.edges], edge => {
                  return edge.post._id
                }),
              }
            }
          })
        }
      })
    }
    return null;
  }
  render() {
    const { data, viewer } = this.props;
    const pageInfo = _.get(data, 'aggregateFeed.posts.page_info', {});
    const posts = _.get(data, 'aggregateFeed.posts.edges', []);

    if ((!data || data.loading) && posts.length === 0) {
      return <Card loading style={{ width: '100%' }} />
    }

    if (posts.length <= 0) {
      return (
        <div>
          <Button onClick={data.refetch.bind(this)} type="primary" loading={data.loading}><i className="fa fa-refresh" /></Button>
          <div className="posts-container">
            <div className="no-posts">
              <h1><i className="fa fa-newspaper-o" /></h1>
              <h2>Nothing to show!</h2>
              <p>Posts from clubs you are a member of will appear here.</p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Button onClick={() => data.refetch()} type="primary" loading={data.loading}><i className="fa fa-refresh" /></Button>
        <div className="posts-container">
          <InfiniteScroll
            pullDownToRefresh
            pullDownToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>}
            releaseToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>}
            refreshFunction={() => data.refetch()}
            hasMore={pageInfo.has_next_page}
            next={this.paginate}
            endMessage=" "
            loader={<Card className="post" loading style={{ width: '100%' }} />}
          >
            {posts.map(edge => <FeedItem perm={clubPermissions(viewer, _.find(viewer.memberships, { club_id: _.get(edge, 'post.owner.owner_id') }))} baseQuery="aggregateFeed" post={edge.post} key={edge.post._id} viewer={viewer} />)}
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}

const NewsFeedGQL = gql`
  query aggregateFeed($first: Int!, $cursor: MongoID) {
    aggregateFeed {
      posts(first: $first, cursor: $cursor) {
        page_info{
          next_page_cursor
          has_next_page
        }
        edges{
          post{
            _id
            user_id
            user{
              name
              images{
                square
              }
              fbid
            }
            text
            likes_count
            comments_count
            liked
            attachment
            owner{
              type
              slug
            }
            images{
              thumb
              background
            }
            privacy
          }
        }
      }
    }
  }
`

const AggregatedNewsFeedQuery = graphql(NewsFeedGQL, {
  options: props => {
    if (!props.viewer) return false;
    return {
      variables: {
        first: 15
      }
    }
  },
  skip: props => {
    if (!props.viewer) return true;
  }
})(AggregatedNewsFeed);

export default AggregatedNewsFeedQuery;
