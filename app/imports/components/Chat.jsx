'use strict';

import React from 'react';

const Chat = class Chat extends React.Component {
    render() {
        return (
            <div className='pa-Chat'>
                {this.props.children}
            </div>
        );
    }
};

export default Chat;
