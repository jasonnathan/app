'use strict';

import React from 'react';
import c from 'classnames';

const Paragraph = class Paragraph extends React.Component {
    render() {
        return <p className={c('pa-Paragraph', {
            'pa-Paragraph--meta': this.props.meta
        }, this.props.className)}>{this.props.children}</p>;
    }
};

Paragraph.propTypes = {
    className: React.PropTypes.string
};

export default Paragraph;
