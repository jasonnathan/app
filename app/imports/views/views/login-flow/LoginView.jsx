'use strict';

import React from 'react';
import {
    Container,
    Link
} from 'touchstonejs';

export default class LoginView extends React.Component {
    render() {
        return (
            <Container className={'NoNavigationBar'}>
                <br />
                <Link to="main:tabs" transition="show-from-right">
                    Inloggen
                </Link>
                <br />
                <br />
                <Link to="login-flow:login-with-email" transition="show-from-right">
                    Inloggen met e-mail
                </Link>
            </Container>
        );
    }
}
