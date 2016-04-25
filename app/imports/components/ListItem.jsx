'use strict';

import React from 'react';
import c from 'classnames';

const ListItem = class ListItem extends React.Component {
    render() {
        return (
            <li className={c('pa-ListItem')}>
                {this.props.children}
            </li>
        );
    }
};

export default ListItem;
