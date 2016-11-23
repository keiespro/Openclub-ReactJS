import Auth0Lock from 'auth0-lock';

class AuthService {
    constructor() {
        this.lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__, {
            auth: {
                // redirect: false
            }
        });

        this.lock.on('authenticated', this.doAuthentication.bind(this));

        this.login = this.login.bind(this);
        this.enterRoute = this.enterRoute.bind(this);
        this.logout = this.logout.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
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
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        history.pushState('/');
    }
    enterRoute(nextState, replace) {
        // if (!!this.getToken()) {
        //     replace('/');
        //     this.login();
        //     this.awaitLogin = this.lock.on('authenticated', () => {
        //         replace(`${nextState.location.pathname}${nextState.location.search}`);
        //         this.awaitLogin = null;
        //     });
        // }
        // this.awaitLogin = null;
    }
}
export default AuthService;
