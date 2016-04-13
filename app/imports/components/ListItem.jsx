'use strict';

import React from 'react';
import c from 'classnames';

export default class ListItem extends React.Component {
    render() {
        return (
            <li className={c('pa-ListItem')}>
                {this.props.children}
            </li>
        );
    }
}
