'use strict';

import React from 'react';
import c from 'classnames';

import Svg from '/imports/components/Svg';
import Button from '/imports/components/Button';

const Logo = class Logo extends React.Component {
    render() {
        return (
            <div>
                <figure className={c('pa-Logo')}>
                    <Svg name="logo" />
                </figure>
            </div>
        );
    }
};

export default Logo;
