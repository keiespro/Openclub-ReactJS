import { connect } from 'react-redux'
import API from 'modules/api'
import JoinView from '../components/JoinView'

const { sync } = API.actions.club_join

const mapDispatchToProps = {
	syncJoin: sync
}

const mapStateToProps = (state) => {
  return {
    join: state.club_join.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinView)
