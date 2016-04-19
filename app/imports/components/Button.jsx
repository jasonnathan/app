'use strict';

import React from 'react';
import c from 'classnames';

import Spinner from '/imports/components/Spinner';

export default class Button extends React.Component {
    render() {
        const className = c('pa-Button', {
            'pa-Button--text': this.props.text,
            'pa-Button--loading': this.props.loading,
            'pa-Button--login': this.props.login,
            'pa-Button--login--facebook': this.props.loginFacebook,
            'pa-Button--login--linkedin': this.props.loginLinkedIn
        });

        const dynamicProps = {};
        !this.props.submit && (dynamicProps.type = 'button');
        this.props.disabled && (dynamicProps.disabled = 'disabled');
        this.props.formNoValidate && (dynamicProps.formNoValidate = 'formNoValidate');

        return (
            <button {...dynamicProps} className={className} onClick={this.onClick.bind(this)}>
                {this.props.children}
                <Spinner button />
            </button>
        );
    }

    onClick(event) {
        if (!this.props.submit) {
            event.preventDefault();
        }

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }
}

Button.propTypes = {
    onClick: React.PropTypes.func,
    submit: React.PropTypes.bool,
    text: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    formNoValidate: React.PropTypes.bool,
    loading: React.PropTypes.bool
};

Button.defaultProps = {
    submit: false,
    text: false,
    disabled: false,
    formNoValidate: false,
    loading: false
};
