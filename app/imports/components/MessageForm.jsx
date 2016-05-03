'use strict';

import React from 'react';
import c from 'classnames';

import Input from '/imports/components/Input';
import Button from '/imports/components/Button';

const MessageForm = class MessageForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} className={c('pa-MessageForm')}>
                <Input.Text />
                <Button submit text>Send</Button>
            </form>
        );
    }

    onSubmit(event) {
        event.preventDefault();
        const form = event.target.elements;

        console.log(form);
    }
};

MessageForm.propTypes = {
    onSend: React.PropTypes.func.isRequired
};

export default MessageForm;
