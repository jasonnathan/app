'use strict';

import React from 'react';
import c from 'classnames';

import App from '../App';
import List from './List';
import ListItem from './ListItem';
import Button from './Button';

export default class LoginChoice extends React.Component {
    render() {
        return (
            <div className={c('pa-LoginChoice')}>
                <List buttons>
                    <ListItem><Button login onClick={() => this.loginWithEmail()}>Sign in with email</Button></ListItem>
                    <ListItem><Button login loginFacebook onClick={this.loginWithFacebook.bind(this)}>Sign in with Facebook</Button></ListItem>
                    <ListItem><Button login loginLinkedIn onClick={this.loginWithLinkedIn.bind(this)}>Sign in with LinkedIn</Button></ListItem>
                </List>
            </div>
        );
    }

    loginWithEmail() {
        App.get().transitionTo('login-flow:login-with-email', {
            transition: 'show-from-right'
        });
    }

    loginWithFacebook() {
        // TODO
        this.transitionIoApp();
    }

    loginWithLinkedIn() {
        // TODO
        this.transitionIoApp();
    }

    transitionIoApp() {
        App.get().transitionTo('root:tabs', {
            transition: 'show-from-right'
        });
    }
}
