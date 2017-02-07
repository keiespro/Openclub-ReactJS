import { connect } from 'react-redux'
import API from 'modules/api'
import Event from '../components/Event'

const { sync } = API.actions.events

const mapDispatchToProps = {
  syncEvent: sync
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
