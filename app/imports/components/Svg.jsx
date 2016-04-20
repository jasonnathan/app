'use strict';

import React from 'react';

import images from '/imports/jcons.json';

export default class Svg extends React.Component {
    render() {
        return <i className={`pa-Svg pa-Svg--${this.props.name}`} dangerouslySetInnerHTML={{__html: images[this.props.name]}} />;
    }
}

Svg.propTypes = {
    name: React.PropTypes.oneOf(Object.keys(images)).isRequired
};
