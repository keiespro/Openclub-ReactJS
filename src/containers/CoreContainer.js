import { connect } from 'react-redux'
import * as authActions from '../modules/auth/actions'
import API from '../modules/api'
import CoreLayout from '../layouts/CoreLayout'

const { sync } = API.actions.user

const mapDispatchToProps = {
  ...authActions,
  syncUser: sync
}

const mapStateToProps = (state) => {
  const { token } = state.auth
  return {
    token,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
