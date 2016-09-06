'use strict';

import React from 'react';
import c from 'classnames';
import Spinner from '/imports/client/components/Spinner';
import Svg from '/imports/client/components/Svg';

const Button = class Button extends React.Component {
    render() {
        const p = this.props;

        const className = c('pa-Button', {
            'pa-Button--text': p.text,
            'pa-Button--text--secondary': p.textSecondary,
            'pa-Button--loading': p.loading,
            'pa-Button--login': p.login,
            'pa-Button--login--facebook': p.loginFacebook,
            'pa-Button--login--linkedin': p.loginLinkedIn,
            'pa-Button--switch': p.switch,
            'pa-Button--switch--active': p.switchActive,
            'pa-Button--hint': p.hint,
            'pa-Button--icon-only': p.iconOnly
        });

        const dynamicProps = {};
        if (!p.submit) { dynamicProps.type = 'button'; }
        if (p.disabled) { dynamicProps.disabled = 'disabled'; }
        if (p.formNoValidate) { dynamicProps.formNoValidate = 'formNoValidate'; }
        if (p.style) { dynamicProps.style = p.style; }

        return (
            <button {...dynamicProps} className={className} onClick={this.onClick.bind(this)}>
                {p.children}
                {p.icon &&
                    <Svg name={p.icon} />
                }
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
};

Button.propTypes = {
    onClick: React.PropTypes.func,
    submit: React.PropTypes.bool,
    text: React.PropTypes.bool,
    textSecondary: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    formNoValidate: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    switch: React.PropTypes.bool,
    switchActive: React.PropTypes.bool,
    style: React.PropTypes.object,
    icon: React.PropTypes.string
};

export default Button;
