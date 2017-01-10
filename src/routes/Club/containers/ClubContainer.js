import { connect } from 'react-redux'
import API from '../../../modules/api'
import ClubView from '../components/ClubView'

const { sync } = API.actions.club

const mapDispatchToProps = {
	syncClub: sync
}

const mapStateToProps = (state) => {
  return {
    club: state.club
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubView)
