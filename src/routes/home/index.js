import { connect } from 'react-redux'

import HomeView from './components/HomeView'

export default (store, auth) => {
    const stateMap = () => ({
        store,
        auth
    });
    return {
        path: '*',
        component: connect(stateMap)(HomeView)
    }
}
