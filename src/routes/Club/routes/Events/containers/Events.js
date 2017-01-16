import { connect } from 'react-redux'
import API from 'modules/api'
import EventsView from '../components/EventsView'

const { sync } = API.actions.club_events

const mapDispatchToProps = {
	syncEvents: sync
}

const mapStateToProps = (state) => {
  return {
    events: state.club_events.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView)
