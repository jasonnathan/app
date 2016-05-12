'use strict';

import React from 'react';
import c from 'classnames';

const ChatMessage = class ChatMessage extends React.Component {
    render() {
        return (
            <div className={c('pa-ChatMessage')}>
                <p>Blabla text in a chat box yes thats what we want!</p>
                <span className='pa-ChatMessage__chattime'>{this.props.time}</span>
            </div>
        );
    }
};

export default ChatMessage;
