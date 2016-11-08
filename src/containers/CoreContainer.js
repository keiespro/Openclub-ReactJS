import { connect } from 'react-redux';
import * as ACTIONS from '../modules/auth/actions';

import CoreLayout from '../layouts/CoreLayout';

const mapDispatchToProps = ACTIONS;

const mapStateToProps = (state) => {
    const { auth } = state;
    const { isAuthenticated, errorMessage } = auth;
    return {
        isAuthenticated,
        errorMessage
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
