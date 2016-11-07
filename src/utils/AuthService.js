import Auth0Lock from 'auth0-lock';

class AuthService {
    constructor() {
        this.lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__, {});

        this.lock.on('authenticated', this.doAuthentication.bind(this));

        this.login = this.login.bind(this);
        this.enterRoute = this.enterRoute.bind(this);
    }
    doAuthentication(authResult) {
        this.setToken(authResult.idToken);
    }
    login() {
        this.lock.show();
    }
    loggedIn() {
        return !!this.getToken();
    }
    setToken(idToken) {
        localStorage.setItem('id_token', idToken);
    }
    getToken(idToken) {
        return localStorage.getItem('id_token');
    }
    logout() {
        localStorage.removeItem('id_token');
    }
    enterRoute(nextState, replace) {
        if (!this.loggedIn()) {
            replace({ pathname: '/login' });
        }
    }
}
export default AuthService;
