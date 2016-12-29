import { connect } from 'react-redux'
import API from 'modules/api'
import AdminView from '../components/AdminView'

const { sync } = API.actions.club_admin

const mapDispatchToProps = {
	syncAdmin: sync
}

const mapStateToProps = (state) => {
  return {
    admin: state.club_admin.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)
