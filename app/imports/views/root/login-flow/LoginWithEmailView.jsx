'use strict';

import React from 'react';
import { Container, UI, Link } from 'touchstonejs';

export default class LoginWithEmailView extends React.Component {
    render() {
        return (
            <Container>
                <UI.NavigationBar name="login-with-email" />
                <Link to="root:tabs" transition="show-from-right">
                    Inloggen met email
                </Link>
            </Container>
        );
    }
}

// Statics
LoginWithEmailView.navigationBar = 'login-with-email';
LoginWithEmailView.getNavigation = (props, app) => {
    return {
        leftArrow: true,
        leftAction: () => {
            app.transitionTo('login-flow:login', {
                transition: 'reveal-from-right'
            });
        },
        title: 'Inloggen met e-mail'
    };
};
