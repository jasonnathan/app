'use strict';

import React from 'react';
import c from 'classnames';
import scrollElementIntoView from '/imports/services/scrollElementIntoView';
import Svg from '/imports/components/Svg';
import Button from '/imports/components/Button';

const Input = {
    Text: class InputText extends React.Component {
        constructor(props) {
            super(props);
            this.scrollIntoView = this.scrollIntoView.bind(this);
        }

        render() {
            const className = c('pa-Input pa-Input--text', {
                'pa-Input--hasicon': this.props.icon,
                'pa-Input--hasclearbutton': this.props.showClearButton
            });

            let type = 'text';
            if (this.props.textarea) type = 'textarea';
            if (this.props.password) type = 'password';
            if (this.props.email) type = 'email';

            const props = {
                ref: 'input',
                name: this.props.name,
                placeholder: this.props.placeholder,
                onChange: this.props.onChange,
                onFocus: this.onFocus.bind(this),
                onBlur: this.onBlur.bind(this)
            };

            return (
                <div className={className}>
                    {this.props.showClearButton &&
                        <Button icon='icon_close' iconOnly onClick={this.onClear.bind(this)} />
                    }
                    {type === 'textarea' ?
                        <textarea {...props}></textarea> :
                        <input type={type} {...props} />
                    }
                    {this.props.icon &&
                        <Svg name={this.props.icon} />
                    }
                </div>
            );
        }

        onClear() {
            this.refs.input.value = '';
            this.props.onClear();
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
    email: React.PropTypes.bool,
    password: React.PropTypes.bool,
    textarea: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    icon: React.PropTypes.string,
    showClearButton: React.PropTypes.bool,
    onClear: React.PropTypes.func
};

export default Input;
