// Dependencies
import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag';

// Components
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
  }
  async paginate(last) {
    const query = await apolloClient.query({
      query: clubsQueryGQL, //eslint-disable-line
      variables: {
        first: 25,
        cursor: last._id
      }
    });
  }
  goTo(link) {
    this.context.router.transitionTo(link);
  }
  render() {
    const { data: { clubs }} = this.props;
    const list = clubs ? [...clubs.edges] : [];
    return (
      <div>
        <h3>Suggested Clubs</h3>
        <hr className="bottom-gap-large" />
        <Row type="flex" justify="space-between">
          {list.map(club => (
            <Col xs={24} md={12} lg={8} key={club._id}>
              <ClubCard club={club} viewer={this.props.viewer} />
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

const clubsQueryGQL = gql`
  query clubs($first: Int!, $cursor: ID) {
    clubs(first:$first, cursor:$cursor) {
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
      }
    }
  }
`
const ClubsApollo = graphql(clubsQueryGQL, {
  options: () => ({
    variables: {
      first: 25
    }
  })
})(ClubsLanding)

export default ClubsApollo;
