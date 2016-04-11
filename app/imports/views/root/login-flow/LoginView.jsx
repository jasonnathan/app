'use strict';

import React from 'react';
import { Container, Link } from 'touchstonejs';
import c from 'classnames';

import Logo from '../../../components/Logo';

export default class LoginView extends React.Component {
    render() {
        return (
            <Container fill className={c('Container NoNavigationBar')}>
                <Logo />
            </Container>
        );
    }
}
