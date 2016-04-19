'use strict';

import React from 'react';
import { Container, Link } from 'touchstonejs';
import c from 'classnames';

import App from '../../../App';
import Debug from '../../../Debug';
import Logo from '../../Logo';
import LoginChoice from '../../LoginChoice';
import SignupLink from '../../SignupLink';

export default class LoginView extends React.Component {
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
        App.get().transitionTo('root:login-flow:login-with-email', {
            transition: 'show-from-right'
        });
    }

    continue() {
        App.get().transitionTo('root:login', {
            transition: 'show-from-right'
        });
    }

    onFacebook() {
        this.props.onLoginWithFacebook((err) => {
            if (err) {
                Debug.methods(`Failed user login with Facebook`, err);
                window.alert('Facebook login failed or cancelled');
            } else {
                Debug.methods(`User logged in with Facebook`);
                this.continue();
            }
        });
    }

    onLinkedIn() {
        this.props.onLoginWithLinkedIn((err) => {
            if (err) {
                Debug.methods(`Failed user login with LinkedIn`, err);
                window.alert('LinkedIn login failed or cancelled');
            } else {
                Debug.methods(`User logged in with Facebook`);
                this.continue();
            }
        });
    }
}

LoginView.propTypes = {
    onLoginWithFacebook: React.PropTypes.func.isRequired,
    onLoginWithLinkedIn: React.PropTypes.func.isRequired
};
