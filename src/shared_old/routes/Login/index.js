import LoginView from './components/LoginView';

export default (store, auth) => {
        return {
            path: 'login',
            component: LoginView,
            auth,
            store
        };
};
