'use strict';

import React from 'react';
import c from 'classnames';

import Button from './Button';

export default class Logo extends React.Component {
    render() {
        return (
            <div>
                <figure className={c('pa-Logo')}>
                    <img src="images/logo.svg" alt="Part-up" />
                </figure>
            </div>
        );
    }
}
