// Dependencies
import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag';

// Components
import InfiniteScroll from 'react-infinite-scroll-component'
import apolloClient from 'modules/apollo'
import ClubCard from 'components/cards/ClubCard'

import './Landing.scss'

class ClubsLanding extends Component {
  static propTypes = {
    data: PropTypes.object,
    viewer: PropTypes.object
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)

    this.paginate = this.paginate.bind(this);
  }
  async paginate() {
    const { fetchMore, clubs: { page_info: pageInfo = {} } = {} } = this.props.data;
    console.log(pageInfo);
    if (pageInfo.next_page_cursor) {
      await fetchMore({
        variables: {
          first: 12,
          cursor: _.get(this.props.data, 'clubs.page_info.next_page_cursor')
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            ...fetchMoreResult,
            clubs: {
              ...prev.clubs,
              ...fetchMoreResult,
              page_info: fetchMoreResult.clubs.page_info,
              edges: _.uniqBy([...prev.clubs.edges, ...fetchMoreResult.clubs.edges], '_id')
            }
          }
        }
      });
    }
    // No cursor
    return null;
  }
  goTo(link) {
    this.context.router.transitionTo(link);
  }
  render() {
    const { data = {} } = this.props;
    const { clubs: { page_info: pageInfo, edges = [] } = {} } = data;

    console.log(edges, pageInfo);

    return (
      <div>
        <h3>Suggested Clubs</h3>
        <hr className="bottom-gap-large" />
        <Row type="flex" justify="flex-start">
          <InfiniteScroll
            hasMore={pageInfo.has_next_page}
            next={this.paginate}
            loader={<Spin style={{ width: '100%' }} tip="Loading..." />}
            endMessage=" "
            >
              {edges.map(club => <ClubCard key={club._id} club={club} viewer={this.props.viewer} />)}
          </InfiniteScroll>
        </Row>
      </div>
    )
  }
}

const clubsQueryGQL = gql`
  query clubs($first: Int!, $cursor: ID) {
    clubs(first:$first, cursor:$cursor) {
      page_info{
        next_page_cursor
        has_next_page
      }
      edges{
        _id
        name
        slug
        details{
          about
          location
        }
        images {
          square
          background
        }
        settings{
          directory_privacy
          feed_permissions
          feed_public_permissions
        }
        membership_plans{
          _id
          name
          description
          public
          prices{
            _id
            duration
            price{
              amount
              amount_float
            },
            setup_price{
              amount
              amount_float
            }
          }
        }
      }
    }
  }
`
const ClubsApollo = graphql(clubsQueryGQL, {
  options: () => ({
    variables: {
      first: 12
    }
  })
})(ClubsLanding)

export default ClubsApollo;
