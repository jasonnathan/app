'use strict';

import React from 'react';

const ChatDaySeparator = class ChatDaySeparator extends React.Component {
    render() {
        return (
            <div className="pa-ChatDaySeparator">
                {this.props.children}
            </div>
        );
    }
};

export default ChatDaySeparator;
