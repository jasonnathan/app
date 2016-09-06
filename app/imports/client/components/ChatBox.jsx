'use strict';

import React from 'react';
import c from 'classnames';

const ChatBox = class ChatBox extends React.Component {
    render() {
        return (
            <div className={c('pa-ChatBox', {
                'pa-ChatBox--send': this.props.send,
                'pa-ChatBox--receive': this.props.receive
            })}>
                {this.props.children}
            </div>
        );
    }
};

export default ChatBox;
