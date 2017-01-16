import { connect } from 'react-redux'
import API from 'modules/api'
import AboutView from '../components/AboutView'

const { sync } = API.actions.club_about

const mapDispatchToProps = {
	syncAbout: sync
}

const mapStateToProps = (state) => {
  return {
    about: state.club_about.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutView)
