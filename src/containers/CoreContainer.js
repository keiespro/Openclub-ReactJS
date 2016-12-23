import { connect } from 'react-redux'
import * as authActions from '../modules/auth/actions'
import API from '../modules/api'
import CoreLayout from '../layouts/CoreLayout'

const { sync } = API.actions.users

const mapDispatchToProps = {
  ...authActions,
  syncUser: sync
}

const mapStateToProps = (state) => {
  const { token } = state.auth
  return {
    token,
    users: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
