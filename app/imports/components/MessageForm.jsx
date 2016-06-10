'use strict';

import React from 'react';
import c from 'classnames';
import { get } from 'mout/object';

import Input from '/imports/components/Input';
import Button from '/imports/components/Button';

const MessageForm = class MessageForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} className={c('pa-MessageForm')} ref="form">
                <Input.Text textarea name="message" onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} onChange={this.onMessageChange.bind(this)} />
                <Button submit text>Send</Button>
            </form>
        );
    }

    componentDidMount() {
        this.onMessageChange();

        if (Keyboard) {
            Keyboard.hideFormAccessoryBar(true);
        }
    }

    componentWillUnmount() {
        if (Keyboard) {
            Keyboard.hideFormAccessoryBar(false);
        }
    }

    onFocus() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    onBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const message = form.elements.message.value;

        this.props.onSend(message);
        form.reset();
        form.elements.message.focus();
        this.onMessageChange();
    }

    onMessageChange() {
        const messageInput = this.refs.form.elements.message;
        messageInput.setCustomValidity(messageInput.value.length > 0 ? '' : 'Required');
    }
};

MessageForm.propTypes = {
    onSend: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
};

export default MessageForm;
