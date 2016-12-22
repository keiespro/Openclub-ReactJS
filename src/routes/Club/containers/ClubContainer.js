import { connect } from 'react-redux'
import API from '../../../modules/api'
import Club from '../components/Club'

const { sync } = API.actions.clubs

const mapDispatchToProps = {
	syncClub: sync
}

const mapStateToProps = (state) => {
  return {
    clubs: state.clubs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Club)
