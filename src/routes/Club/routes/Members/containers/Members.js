import { connect } from 'react-redux'
import API from 'modules/api'
import MembersView from '../components/MembersView'

const { sync } = API.actions.club_members

const mapDispatchToProps = {
	syncMembers: sync
}

const mapStateToProps = (state) => {
  return {
    members: state.club_members.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersView)
