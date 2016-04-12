'use strict';

import React from 'react';
import c from 'classnames';

export default class Paragraph extends React.Component {
    render() {
        return <p className={c('pa-Paragraph')}>{this.props.children}</p>;
    }
}
