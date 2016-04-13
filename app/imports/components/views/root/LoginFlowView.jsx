'use strict';

import React from 'react';
import { Container, UI, View, ViewManager } from 'touchstonejs';

import LoginWithEmailView from './login-flow/LoginWithEmailView';

export default class LoginFlowView extends React.Component {
    render() {
        return (
            <Container>
                <UI.NavigationBar name="login-flow" className={"NavigationBar--detail"} />
                <ViewManager name="login-flow" defaultView="login-with-email">
                    <View name="login-with-email" component={LoginWithEmailView} />
                </ViewManager>
            </Container>
        );
    }
}
