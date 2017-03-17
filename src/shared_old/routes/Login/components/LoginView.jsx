import React, { Component, PropTypes } from 'react';
import { Link } from 'teardrop';

class LoginView extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired //eslint-disable-line
    }
    constructor(props) {
        super(props);

        let { auth } = props.route;
        this.auth = auth;

        this.loginWithFacebook = this.auth.login.bind(this, { connection: 'facebook' })
        this.preventDefault = (e) => e.preventDefault();
    }
    componentDidMount() {
        window.auth = this.auth;
    }
    render() {
        console.log('THIS', this);
        return (
            <div className="container container-xs">
                <img src="img/logo.png" className="mv-lg block-center img-responsive login-logo" role="presentation" />
                <form noValidate className="card b0 form-validate" onSubmit={this.preventDefault}>
                    <div className="card-offset pb0">
                        <div className="card-offset-item text-right">
                            <Link to="signup" className="btn-raised btn btn-info btn-circle btn-lg">
                                <em className="ion-person-add" />
                            </Link>
                        </div>
                        <div className="card-offset-item text-right hidden">
                            <div className="btn btn-success btn-circle btn-lg"><em className="ion-checkmark-round"></em></div>
                        </div>
                    </div>
                    <div className="card-heading">
                        <div className="card-title text-center">Login</div>
                    </div>
                    <div className="card-body">
                        <button className="btn btn-lg btn-primary bg-light-blue-900 col-xs-12" onClick={this.loginWithFacebook}>
                            <i className="fa fa-facebook" /> Log in with Facebook
                        </button>
                    </div>
                    <hr />
                    <div className="card-body">
                        <div className="mda-form-group float-label mda-input-group">
                            <div className="mda-form-control">
                                <input type="email" name="email" required="" className="form-control focus" />
                                <div className="mda-form-control-line" />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <span className="mda-input-group-addon">
                                <em className="ion-ios-email-outline icon-lg" />
                            </span>
                        </div>
                        <div className="mda-form-group float-label mda-input-group">
                            <div className="mda-form-control focus">
                                <input type="password" name="password" required="" className="form-control focus" />
                                <div className="mda-form-control-line" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <span className="mda-input-group-addon">
                            <em className="ion-ios-locked-outline icon-lg"></em>
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-flat">Log in</button>
                </form>
                <div className="text-center text-sm text-light">
                    <Link to="forgot" className="text-inherit">Forgot password?</Link>
                    <span> | </span>
                    <Link to="/" className="text-inherit">Homepage</Link>
                </div>
            </div>
        );
    }
}
export default LoginView;
