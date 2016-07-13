'use strict';

import React from 'react';
import c from 'classnames';
import { formatDate } from 'part-up-js-helpers';
import { get } from 'mout/object';
import Avatar from '/imports/components/Avatar';
import Paragraph from '/imports/components/Paragraph';
import { UserModel, ChatModel, ChatMessageModel, NetworkModel } from '/imports/models';

const ChatTile = class ChatTile extends React.Component {
    render() {
        const {chat, loggedInUser, newChatMessagesCount, lastChatMessage} = this.props;
        const className = c('pa-ChatTile', {
            'pa-ChatTile--is-unread': !!newChatMessagesCount,
            'pa-ChatTile--no-preview-message': !lastChatMessage
        });


        let content;
        if (this.props.isUserSearchResult) {
            content = this.renderUserSearchResultContent();
        } else if (this.props.user) {
            content = this.renderPrivateChatContent();
        } else if (this.props.network) {
            content = this.renderNetworkChatContent();
        }

        if (this.props.onClick) {
            return (
                <a onClick={this.onClick.bind(this)} className={className}>
                    {content}
                </a>
            );
        }

        return (
            <div className={className}>
                {content}
            </div>
        );
    }

    renderUserSearchResultContent() {
        const {user, loggedInUser} = this.props;
        const userAvatar = user.getAvatarImage();
        const isOnline = get(user, 'status.online');

        return (
            <div className="pa-ChatTile__wrapper">
                <div className="pa-ChatTile__image">
                    <Avatar src={userAvatar && userAvatar.getUrl('80x80')} isOnline={isOnline}></Avatar>
                </div>
                <div className="pa-ChatTile__label">
                    <Paragraph className="pa-ChatTile__label__title">{user.profile.name}</Paragraph>
                </div>
            </div>
        );
    }

    renderPrivateChatContent() {
        const {chat, user, lastChatMessage, lastChatMessageUser, loggedInUser} = this.props;
        const userAvatar = user.getAvatarImage();
        const readableUpdatedAt = chat && formatDate.relativeWithThreshold(chat.updated_at, new Date());
        const isOnline = get(user, 'status.online');
        const newChatMessagesCountIndicator = this.props.newChatMessagesCount && `(${this.props.newChatMessagesCount})` || undefined;

        return (
            <div className="pa-ChatTile__wrapper">
                <div className="pa-ChatTile__image">
                    <Avatar src={userAvatar && userAvatar.getUrl('80x80')} isOnline={isOnline}></Avatar>
                </div>
                <div className="pa-ChatTile__label">
                    <Paragraph className="pa-ChatTile__label__title">{user.profile.name} {newChatMessagesCountIndicator}</Paragraph>
                    {lastChatMessage &&
                        <Paragraph>
                            {lastChatMessageUser && lastChatMessageUser.equals(loggedInUser) &&
                                <strong>You:</strong>
                            }
                            {lastChatMessage.content}
                        </Paragraph>
                    }
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

    renderNetworkChatContent() {
        const {chat, network, lastChatMessage, lastChatMessageUser, loggedInUser} = this.props;
        const image = network.getImage();
        const readableUpdatedAt = chat && formatDate.relativeWithThreshold(chat.updated_at, new Date());
        const newChatMessagesCountIndicator = this.props.newChatMessagesCount && `(${this.props.newChatMessagesCount})` || undefined;

        return (
            <div className="pa-ChatTile__wrapper">
                <div className="pa-ChatTile__image pa-ChatTile__image--network">
                    <figure style={{
                        backgroundImage: image && `url('${image.getUrl()}')`}}>
                    </figure>
                </div>
                <div className="pa-ChatTile__label">
                    <Paragraph className="pa-ChatTile__label__title">{network.name} {newChatMessagesCountIndicator}</Paragraph>
                    <Paragraph>
                        <strong>
                            {lastChatMessageUser.equals(loggedInUser)
                                ? `You:`
                                : `${lastChatMessageUser.profile.name}:`
                            }
                        </strong>
                        {lastChatMessage && lastChatMessage.content}
                    </Paragraph>
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
    onClick: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.instanceOf(UserModel).isRequired,
    user: React.PropTypes.instanceOf(UserModel),
    network: React.PropTypes.instanceOf(NetworkModel),
    chat: React.PropTypes.instanceOf(ChatModel),
    lastChatMessage: React.PropTypes.instanceOf(ChatMessageModel),
    lastChatMessageUser: React.PropTypes.instanceOf(UserModel),
    isUserSearchResult: React.PropTypes.bool
};

export default ChatTile;
