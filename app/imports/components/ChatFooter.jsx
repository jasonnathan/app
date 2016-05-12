'use strict';

import React from 'react';

const ChatFooter = class ChatFooter extends React.Component {
    render() {
        return (
            <footer className='pa-ChatFooter'>
                {this.props.children}
            </footer>
        );
    }
};

export default ChatFooter;
