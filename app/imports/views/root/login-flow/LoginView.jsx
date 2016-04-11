'use strict';

import React from 'react';
import { Container, Link } from 'touchstonejs';
import c from 'classnames';

import Logo from '../../../components/Logo';
import LoginChoice from '../../../components/LoginChoice';

export default class LoginView extends React.Component {
    render() {
        return (
            <Container fill className={c('Container NoNavigationBar')}>
                <Logo />
                <LoginChoice />
            </Container>
        );
    }
}
