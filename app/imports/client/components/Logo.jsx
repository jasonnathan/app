'use strict';

import React from 'react';
import c from 'classnames';

import Svg from '/imports/client/components/Svg';
import Button from '/imports/client/components/Button';

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
