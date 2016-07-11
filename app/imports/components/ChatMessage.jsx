'use strict';

import React from 'react';
import c from 'classnames';
import { stripHtmlTags } from 'mout/string';

import parseMentions from '/imports/services/parseMentions';
import autolink from '/imports/services/autolink';

const ChatMessage = class ChatMessage extends React.Component {
    render() {
        const {message, showName, name} = this.props;
        const text = autolink(parseMentions(stripHtmlTags(message).replace(/\n/g, '<br />')));
        console.log(showName);

        return (
            <div className={c('pa-ChatMessage')}>
                {showName &&
                    <p className='pa-ChatMessage__author'>{name}</p>
                }
                <p>{text}</p>
            </div>
        );
    }
};

ChatMessage.propTypes = {
    message: React.PropTypes.string.isRequired,
    showName: React.PropTypes.bool,
    name: React.PropTypes.string
};

export default ChatMessage;
