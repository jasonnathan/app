'use strict';

import React from 'react';
import c from 'classnames';

import Svg from './Svg';
import Button from './Button';

export default class Logo extends React.Component {
    render() {
        return (
            <div>
                <figure className={c('pa-Logo')}>
                    <Svg name="logo" />
                </figure>
            </div>
        );
    }
}
