import { connect } from 'react-redux'
import * as authActions from '../../../modules/auth/actions'
import ProfilePage from '../components/ProfilePage'

const mapDispatchToProps = {
  ...authActions
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
