import { connect } from 'react-redux'
import * as authActions from '../modules/auth/actions'
import CoreLayout from '../layouts/CoreLayout'

const mapDispatchToProps = {
  ...authActions
}

const mapStateToProps = (state) => {
  const { token } = state.auth
  return {
    token
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
