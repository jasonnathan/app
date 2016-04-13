'use strict';

import React from 'react';
import { Container, Link } from 'touchstonejs';
import c from 'classnames';

import Logo from '../../Logo';
import LoginChoice from '../../LoginChoice';
import SignupLink from '../../SignupLink';

export default class LoginView extends React.Component {
    render() {
        return (
            <Container fill className={c('Container NoNavigationBar')}>
                <Logo />
                <LoginChoice />
                <SignupLink />
            </Container>
        );
    }
}
