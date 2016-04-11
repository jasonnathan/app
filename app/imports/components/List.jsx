'use strict';

import React from 'react';
import c from 'classnames';

export default class List extends React.Component {
    render() {
        return (
            <ul className={c('pa-List', {
                'pa-List--buttons': this.props.buttons
            })}>
                {this.props.children}
            </ul>
        );
    }
}
