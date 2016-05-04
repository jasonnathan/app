'use strict';

import React from 'react';
import c from 'classnames';

const ButtonGroup = class ButtonGroup extends React.Component {
    render() {
        return (
            <div className={c('pa-ButtonGroup')}>
                {this.props.children}
            </div>
        );
    }
};

export default ButtonGroup;
