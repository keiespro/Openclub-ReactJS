import { connect } from 'react-redux'
import API from 'modules/api'
import FeedView from '../components/FeedView'

const { sync } = API.actions.club_feed

const mapDispatchToProps = {
	syncFeed: sync
}

const mapStateToProps = (state) => {
  return {
    feed: state.club_feed.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedView)
