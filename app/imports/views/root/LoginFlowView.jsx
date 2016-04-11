'use strict';

import React from 'react';
import { Container, View, ViewManager } from 'touchstonejs';

import LoginView from './login-flow/LoginView';
import LoginWithEmailView from './login-flow/LoginWithEmailView';

export default class LoginFlowView extends React.Component {
    render() {
        return (
            <Container>
                <ViewManager name="login-flow" defaultView="login">
                    <View name="login" component={LoginView} />
                    <View name="login-with-email" component={LoginWithEmailView} />
                </ViewManager>
            </Container>
        );
    }
}
