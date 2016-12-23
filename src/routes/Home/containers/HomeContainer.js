import { connect } from 'react-redux'
import * as authActions from '../../../modules/auth/actions'
import Home from '../components/Home'

const mapDispatchToProps = {
  ...authActions
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
