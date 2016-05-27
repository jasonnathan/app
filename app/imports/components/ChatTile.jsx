'use strict';

import React from 'react';
import c from 'classnames';
import { formatDate } from 'part-up-js-helpers';
import { get } from 'mout/object';
import Avatar from '/imports/components/Avatar';
import Paragraph from '/imports/components/Paragraph';
import { UserModel, ChatModel, ChatMessageModel } from '/imports/models';

const ChatTile = class ChatTile extends React.Component {
    render() {
        const {chat, loggedInUser} = this.props;
        const className = c('pa-ChatTile', {
            'pa-ChatTile--is-unread': chat && chat.getUnreadCountForUser(loggedInUser) > 0
        });

        if (this.props.onClick) {
            return (
                <a onClick={this.onClick.bind(this)} className={className}>
                    {this.renderContent()}
                </a>
            );
        }

        return (
            <div className={className}>
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        const {chat, user, lastChatMessage} = this.props;
        const userAvatar = user.getAvatarImage();
        const readableUpdatedAt = chat && formatDate.relativeWithThreshold(chat.updated_at, new Date());

        return (
            <div>
                <div className="pa-ChatTile__image">
                    <Avatar src={userAvatar && userAvatar.getUrl('80x80')}></Avatar>
                </div>
                <div className="pa-ChatTile__label">
                    <Paragraph className="pa-ChatTile__label__title">{user.profile.name}</Paragraph>
                    <Paragraph>{lastChatMessage && lastChatMessage.content}</Paragraph>
                </div>
                {readableUpdatedAt && lastChatMessage &&
                    <span className="pa-ChatTile__time">
                        <Paragraph>{readableUpdatedAt}</Paragraph>
                    </span>
                }
                <span className="pa-ChatTile__alert">
                </span>
            </div>
        );
    }

    onClick(event) {
        event.preventDefault();
        this.props.onClick();
    }
};

ChatTile.propTypes = {
    loggedInUser: React.PropTypes.instanceOf(UserModel).isRequired,
    user: React.PropTypes.instanceOf(UserModel).isRequired,
    chat: React.PropTypes.instanceOf(ChatModel),
    lastChatMessage: React.PropTypes.instanceOf(ChatMessageModel)
};

export default ChatTile;
