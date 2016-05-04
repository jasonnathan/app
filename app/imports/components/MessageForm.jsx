'use strict';

import React from 'react';
import c from 'classnames';

import Input from '/imports/components/Input';
import Button from '/imports/components/Button';

const MessageForm = class MessageForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} className={c('pa-MessageForm')}>
                <Input.Text onFocus={this.props.onFocus.bind(this)} onBlur={this.props.onBlur.bind(this)} />
                <Button submit text>Send</Button>
            </form>
        );
    }

    onSubmit(event) {
        event.preventDefault();
        const form = event.target.elements;

        // todo
    }
};

MessageForm.propTypes = {
    onSend: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
};

export default MessageForm;
