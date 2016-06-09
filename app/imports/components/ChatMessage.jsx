'use strict';

import React from 'react';
import c from 'classnames';

import parseMentions from '/imports/services/parseMentions';
import autolink from '/imports/services/autolink';

const ChatMessage = class ChatMessage extends React.Component {
    render() {
        const text = autolink(parseMentions(this.props.message));

        return (
            <div className={c('pa-ChatMessage')}>
                <p>{text}</p>
                <span className='pa-ChatMessage__chattime'>{this.props.time}</span>
            </div>
        );
    }
};

export default ChatMessage;
