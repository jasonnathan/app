'use strict';

import React from 'react';
import { Container, UI, View, ViewManager } from 'touchstonejs';

import LoginWithEmailContainer from '/imports/views/root/login-flow/LoginWithEmailContainer';

const LoginFlowViewManager = class LoginFlowViewManager extends React.Component {
    render() {
        return (
            <Container>
                <UI.NavigationBar name="login-flow" className={"NavigationBar--detail"} />
                <ViewManager name="login-flow" defaultView="login-with-email">
                    <View name="login-with-email" component={LoginWithEmailContainer} />
                </ViewManager>
            </Container>
        );
    }
};

export default LoginFlowViewManager;
