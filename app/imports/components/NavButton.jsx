'use strict';

import React from 'react';
import c from 'classnames';

import Svg from '/imports/components/Svg';

export default class NavButton extends React.Component {
    render() {
        return (
            <div className={c('pa-NavButton', {
                'pa-NavButton--left': this.props.left,
                'pa-NavButton--right': this.props.right
            })}>
                {this.props.left && this.renderLeftContent()}
                {this.props.right && this.renderRightContent()}
            </div>
        );
    }

    renderLeftContent() {
        return [
            <Svg key="svg" name={this.props.icon} />,
            <span key="label">{this.props.label}</span>
        ];
    }

    renderRightContent() {
        return [
            <span key="label">{this.props.label}</span>,
            <Svg key="svg" name={this.props.icon} />
        ];
    }
}

NavButton.propTypes = {
    left: React.PropTypes.bool,
    right: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string
};
