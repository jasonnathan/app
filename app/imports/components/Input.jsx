'use strict';

import React from 'react';
import c from 'classnames';

import scrollElementIntoView from '/imports/services/scrollElementIntoView';

const Input = {
    Text: class InputText extends React.Component {
        constructor(props) {
            super(props);
            this.scrollIntoView = this.scrollIntoView.bind(this);
        }

        render() {
            const className = c('pa-Input pa-Input--text');

            let type = 'text';
            if (this.props.password) type = 'password';
            if (this.props.email) type = 'email';

            return (
                <div className={className}>
                    <input
                        ref="input"
                        type={type}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        onFocus={this.onFocus.bind(this)}
                        onBlur={this.onBlur.bind(this)} />
                </div>
            );
        }

        onFocus(event) {
            window.addEventListener('keyboardDidShow', this.scrollIntoView);

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }

        onBlur() {
            window.removeEventListener('keyboardDidShow', this.scrollIntoView);

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }

        scrollIntoView() {
            scrollElementIntoView(this.refs.input);
        }
    }
};

Input.Text.propTypes = {
    password: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
};

Input.Text.defaultProps = {
    password: false
};

export default Input;
