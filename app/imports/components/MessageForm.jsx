'use strict';

import React from 'react';
import c from 'classnames';

import Input from '/imports/components/Input';
import Button from '/imports/components/Button';

const MessageForm = class MessageForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} className={c('pa-MessageForm')} ref="form">
                <Input.Text name="message" onFocus={this.props.onFocus.bind(this)} onBlur={this.props.onBlur.bind(this)} onChange={this.onMessageChange.bind(this)} />
                <Button submit text>Send</Button>
            </form>
        );
    }

    componentDidMount() {
        this.onMessageChange();
    }

    onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const message = form.elements.message.value;

        this.props.onSend(message);
        form.reset();
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
