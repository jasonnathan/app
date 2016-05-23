'use strict';

import React from 'react';
import c from 'classnames';
import { throttle } from 'lodash';

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
    constructor(props) {
        super(props);
        this.onScroll = throttle(this.onScroll, 100);
    }

    render() {
        return (
            <div className={c('pa-Flex__Stretch', {
                'pa-Flex__Stretch--scroll': this.props.scroll
            }, this.props.className)} ref="flexStretch">
                {this.props.children}
            </div>
        );
    }

    componentDidMount() {
        this.refs.flexStretch.addEventListener('scroll', this.onScroll.bind(this));
    }

    componentWillUnmount() {
        this.refs.flexStretch.removeEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll(event) {
        if (this.props.onHitBottom) {
            const scroller = event.target;
            const maxScroll = scroller.scrollHeight - scroller.getBoundingClientRect().height;
            const THRESHOLD = 40;

            if (scroller.scrollTop + THRESHOLD >= maxScroll) {
                this.props.onHitBottom();
            }
        }
    }
};

Flex.Stretch.propTypes = {
    scroll: React.PropTypes.bool,
    className: React.PropTypes.string,
    onHitBottom: React.PropTypes.func
};

Flex.Stretch.defaultProps = {
    scroll: false
};

export default Flex;
