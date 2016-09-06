'use strict';

import React from 'react';
import { Container, Link } from '/imports/client/touchstonejs/lib';
import c from 'classnames';

import transitionTo from '/imports/client/services/transitionTo';
import Debug from '/imports/client/Debug';
import Logo from '/imports/client/components/Logo';
import LoginChoice from '/imports/client/components/LoginChoice';
import SignupLink from '/imports/client/components/SignupLink';
import setCurrentBackbuttonHandler from '/imports/client/services/setCurrentBackbuttonHandler';

const LoginView = class LoginView extends React.Component {
    componentDidMount() {
        setCurrentBackbuttonHandler(undefined);
    }

    render() {
        return (
            <Container fill className={c('Container NoNavigationBar')}>
                <Logo />
                <LoginChoice
                    onEmail={this.onEmail.bind(this)}
                    onFacebook={this.onFacebook.bind(this)}
                    onLinkedIn={this.onLinkedIn.bind(this)} />
                <SignupLink />
            </Container>
        );
    }

    onEmail() {
        transitionTo('root:login-flow:login-with-email', {
            transition: 'show-from-right'
        });
    }

    continue() {
        transitionTo('root:login', {
            transition: 'show-from-right'
        });
    }

    onFacebook() {
        this.props.onLoginWithFacebook((err) => {
            if (err) {
                Debug.methodResult(`Failed user login with Facebook`, err);
                window.alert('Facebook login failed or cancelled');
            } else {
                Debug.methodResult(`User logged in with Facebook`);
                this.continue();
            }
        });
    }

    onLinkedIn() {
        this.props.onLoginWithLinkedIn((err) => {
            if (err) {
                Debug.methodResult(`Failed user login with LinkedIn`, err);
                window.alert('LinkedIn login failed or cancelled');
            } else {
                Debug.methodResult(`User logged in with Facebook`);
                this.continue();
            }
        });
    }
};

LoginView.propTypes = {
    onLoginWithFacebook: React.PropTypes.func.isRequired,
    onLoginWithLinkedIn: React.PropTypes.func.isRequired
};

export default LoginView;
