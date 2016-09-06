'use strict';

import React from 'react';
import c from 'classnames';
import ReactSpinner from 'react-spinjs';

export default class Spinner extends React.Component {
    render() {
        const className = c('pa-Spinner', {
            'pa-Spinner--button': this.props.button,
            'pa-Spinner--infinite-scroll': this.props.infiniteScroll
        });

        const opts = {
            lines: 13,  // The number of lines to draw
            length: 6,  // The length of each line
            width: 2,  // The line thickness
            radius: 6,  // The radius of the inner circle
            corners: 1,  // Corner roundness (0..1)
            rotate: 0,  // The rotation offset
            direction: 1,  // 1: clockwise, -1: counterclockwise
            color: '#000',  // #rgb or #rrggbb
            speed: 1.2,  // Rounds per second
            trail: 60,  // Afterglow percentage
            shadow: false,  // Whether to render a shadow
            hwaccel: false,  // Whether to use hardware acceleration
            className: className, // The CSS class to assign to the spinner
            zIndex: 0,  // The z-index (defaults to 2000000000)
            top: '50%',  // Top position relative to parent in px
            left: 'auto'  // Left position relative to parent in px
        };

        if (this.props.button) {
            opts.color = '#fff';
            opts.width = 1;
            opts.length = 4;
            opts.radius = 4;
        }

        if (this.props.infiniteScroll) {
            opts.color = '#999';
            opts.width = 1;
            opts.length = 4;
            opts.radius = 4;
        }

        return <ReactSpinner config={opts} />;
    }
}

Spinner.propTypes = {
    button: React.PropTypes.bool,
    infiniteScroll: React.PropTypes.bool
};

Spinner.defaultProps = {
    button: false,
    infiniteScroll: false
};
