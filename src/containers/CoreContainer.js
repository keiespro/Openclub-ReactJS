import { connect } from 'react-redux';
import * as ACTIONS from '../modules/auth/actions';

import CoreLayout from '../layouts/CoreLayout';

const mapDispatchToProps = ACTIONS;

const mapStateToProps = (state) => {
  const { auth: { token } } = state;
  return {
    token
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
