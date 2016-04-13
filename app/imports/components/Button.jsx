'use strict';

import React from 'react';
import c from 'classnames';

import Spinner from './Spinner';

export default class Button extends React.Component {
    render() {
        const className = c('pa-Button', {
            'pa-Button--text': this.props.text,
            'pa-Button--loading': this.props.loading,
            'pa-Button--login': this.props.login,
            'pa-Button--login--facebook': this.props.loginFacebook,
            'pa-Button--login--linkedin': this.props.loginLinkedIn
        });

        return (
            <button type={this.props.submit ? "submit" : "button"} className={className} onClick={this.onClick.bind(this)}>
                {this.props.children}
                <Spinner button />
            </button>
        );
    }

    onClick(event) {
        event.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }
}

Button.propTypes = {
    onClick: React.PropTypes.func,
    submit: React.PropTypes.bool,
    text: React.PropTypes.bool,
    loading: React.PropTypes.bool
};

Button.defaultProps = {
    submit: false,
    text: false,
    loading: false
};
