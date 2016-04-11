'use strict';

import React from 'react';
import c from 'classnames';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className={c('pa-Button', {
                'pa-Button--login': this.props.login,
                'pa-Button--login--facebook': this.props.loginFacebook,
                'pa-Button--login--linkedin': this.props.loginLinkedIn
            })} onClick={this.onClick.bind(this)}>
                {this.props.children}
            </button>
        );
    }

    onClick(event) {
        event.preventDefault();
        this.props.onClick();
    }
}
