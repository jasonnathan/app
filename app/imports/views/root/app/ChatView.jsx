'use strict';

import React from 'react';
import c from 'classnames';
import { defer } from 'lodash';
import { find } from 'mout/array';
import moment from 'moment';
import groupArray from '/imports/services/groupArray';
import ReversedScroller from '/imports/classes/ReversedScroller';
import NavButton from '/imports/components/NavButton';
import Button from '/imports/components/Button';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Avatar from '/imports/components/Avatar';
import ChatBox from '/imports/components/ChatBox';
import ChatMessage from '/imports/components/ChatMessage';
import ChatDaySeparator from '/imports/components/ChatDaySeparator';
import MessageForm from '/imports/components/MessageForm';
import Input from '/imports/components/Input';
import Flex from '/imports/components/Flex';
import { ChatModel, ChatMessageModel, UserModel } from '/imports/models';

const ChatView = class ChatView extends React.Component {
    constructor(props) {
        super(props);

        this.reversedScroller = new ReversedScroller();
    }

    componentWillUnmount() {
        this.reversedScroller.destroy();
    }

    componentDidUpdate() {
        defer(() => {
            if (this.refs.messages && this.refs.messages.refs.flexStretch) {
                this.reversedScroller.contentPossiblyUpdated(this.refs.messages.refs.flexStretch);
            }
        });
    }

    render() {
        const {chat, chatUser, chatLoading, sendChatMessage, loggedInUser} = this.props;
        const groupedByAuthor = this.getChatMessagesGroupedByAuthor();
        const groupedByDay = this.getChatMessagesGroupedByDay(groupedByAuthor);

        return (
            <Flex>
                <Flex.Stretch scroll className="View--chat__messages" ref="messages">
                    {groupedByDay.map((dayGroup, index) => {
                        const readableDay = moment(dayGroup.day).calendar(null, {
                            sameDay: '[Today]',
                            lastDay: '[Yesterday]',
                            lastWeek: '[Last] dddd',
                            sameElse: 'LL'
                        });

                        return (
                            <div key={index}>
                                <ChatDaySeparator>{readableDay}</ChatDaySeparator>
                                {dayGroup.messagesGroupedByAuthor.map((messageGroup, index) => {
                                    const isSend = messageGroup.author.equals(loggedInUser);
                                    const authorAvatar = messageGroup.author.getAvatarImage();

                                    return (
                                        <ChatBox send={isSend} receive={!isSend} key={index}>
                                            <Avatar src={authorAvatar && authorAvatar.getUrl()}></Avatar>
                                            <List>
                                                {messageGroup.messages.map((message, _index) => {
                                                    const humanReadableMessageDate = moment(message.created_at).format('LT');

                                                    return (
                                                        <ListItem key={_index}>
                                                            <ChatMessage message={message.content} time={humanReadableMessageDate} />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </ChatBox>
                                    );
                                })}
                            </div>
                        );
                    })}
                </Flex.Stretch>
                <Flex.Shrink className="View--chat__box">
                    <MessageForm
                        onSend={sendChatMessage.bind(this)}
                        onFocus={this.onMessageBoxFocus.bind(this)}
                        onBlur={this.onMessageBoxBlur.bind(this)} />
                </Flex.Shrink>
            </Flex>
        );
    }

    onMessageBoxFocus() {}
    onMessageBoxBlur() {}

    getChatMessagesGroupedByAuthor() {
        const {chatMessages, loggedInUser, chatUser} = this.props;

        return groupArray(chatMessages, (previous, current) => {
            const previousMoment = moment(previous.created_at);
            const currentMoment = moment(current.created_at);

            return previous.creator_id === current.creator_id &&            // different author
                previousMoment.dayOfYear() === currentMoment.dayOfYear() && // different day-of-year
                previousMoment.year() === currentMoment.year();             // different year
        })
        .map((messages) => {
            return {
                author: messages[0].creator_id === chatUser._id ? chatUser : loggedInUser,
                messages
            };
        });
    }

    getChatMessagesGroupedByDay(groupedByAuthor) {
        const {chatMessages, loggedInUser, chatUser} = this.props;

        return groupArray(groupedByAuthor, (previous, current) => {
            const previousMoment = moment(previous.messages[previous.messages.length - 1].created_at);
            const currentMoment = moment(current.messages[0].created_at);

            return previousMoment.dayOfYear() === currentMoment.dayOfYear() && // different day-of-year
                   previousMoment.year() === currentMoment.year();             // different year
        })
        .map((groupedMessages) => {
            return {
                day: groupedMessages[0].messages[0].created_at,
                messagesGroupedByAuthor: groupedMessages
            };
        });
    }
};

ChatView.navigationBar = 'app';
ChatView.getNavigation = (props, app) => {
    return {
        title: props.chatUsername,
        leftLabel: <NavButton left icon="icon_back" label="Chats" />,
        leftAction: () => {
            app.transitionTo('app:tabs:chats', {
                transition: 'reveal-from-right'
            });
        }
    };
};

ChatView.propTypes = {
    chat: React.PropTypes.instanceOf(ChatModel),
    chatUser: React.PropTypes.instanceOf(UserModel),
    chatMessages: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ChatMessageModel)).isRequired,
    chatLoading: React.PropTypes.bool.isRequired,
    sendChatMessage: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.instanceOf(UserModel).isRequired
};

export default ChatView;
