'use strict';

import React from 'react';
import c from 'classnames';

const Flex = class Flex extends React.Component {
    render() {
        return (
            <div className={c('pa-Flex', this.props.className)} ref="flex">
                {this.props.children}
            </div>
        );
    }
};

Flex.propTypes = {
    className: React.PropTypes.string
};

Flex.Shrink = class FlexShrink extends React.Component {
    render() {
        return (
            <div className={c('pa-Flex__Shrink', this.props.className)} ref="flexShrink">
                {this.props.children}
            </div>
        );
    }
};

Flex.Shrink.propTypes = {
    className: React.PropTypes.string
};

Flex.Stretch = class FlexStretch extends React.Component {
    render() {
        return (
            <div className={c('pa-Flex__Stretch', {
                'pa-Flex__Stretch--scroll': this.props.scroll
            }, this.props.className)} ref="flexStretch">
                {this.props.children}
            </div>
        );
    }
};

Flex.Stretch.propTypes = {
    scroll: React.PropTypes.bool,
    className: React.PropTypes.string
};

Flex.Stretch.defaultProps = {
    scroll: false
};

export default Flex;
