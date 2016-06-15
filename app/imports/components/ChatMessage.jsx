'use strict';

import React from 'react';
import c from 'classnames';
import { stripHtmlTags } from 'mout/string';

import parseMentions from '/imports/services/parseMentions';
import autolink from '/imports/services/autolink';

const ChatMessage = class ChatMessage extends React.Component {
    render() {
        const text = autolink(parseMentions(stripHtmlTags(this.props.message).replace(/\n/g, '<br />')));

        return (
            <div className={c('pa-ChatMessage')}>
                <p>{text}</p>
            </div>
        );
    }
};

ChatMessage.propTypes = {
    message: React.PropTypes.string.isRequired
};

export default ChatMessage;
