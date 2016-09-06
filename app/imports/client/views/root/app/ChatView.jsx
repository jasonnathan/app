'use strict';

import React from 'react';
import c from 'classnames';
import { defer } from 'lodash';
import { contains } from 'mout/array';
import { get, set } from 'mout/object';
import moment from 'moment';
import groupArray from '/imports/client/services/groupArray';
import { ChatModel, ChatMessageModel, UserModel } from '/imports/client/models';
import NavButton from '/imports/client/components/NavButton';
import Button from '/imports/client/components/Button';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import Avatar from '/imports/client/components/Avatar';
import ChatBox from '/imports/client/components/ChatBox';
import ChatMessage from '/imports/client/components/ChatMessage';
import ChatDaySeparator from '/imports/client/components/ChatDaySeparator';
import MessageForm from '/imports/client/components/MessageForm';
import Input from '/imports/client/components/Input';
import Flex from '/imports/client/components/Flex';
import Spinner from '/imports/client/components/Spinner';
import setCurrentBackbuttonHandler from '/imports/client/services/setCurrentBackbuttonHandler';
import transitionTo from '/imports/client/services/transitionTo';

let unsentMessagesPerChat = {};

const ChatView = class ChatView extends React.Component {
    constructor(props) {
        super(props);

        this.scrollPositionFromBottomBeforeLoadingMore;
        props.chatMessages.reset();
    }

    componentWillUnmount() {
        const unsentMessage = get(this, 'refs.messageForm.refs.form.elements.message.value');
        if (unsentMessage) {
            unsentMessagesPerChat[this.props.chatId] = unsentMessage;
        } else {
            delete unsentMessagesPerChat[this.props.chatId];
        }
    }

    componentDidUpdate() {
        this.props.markChatAsRead();
    }

    componentWillMount() {
        this.props.markChatAsRead();
    }

    render() {
        const {chat, chatMessages: chatMessagesProps, chatLoading, loggedInUser, chatType} = this.props;
        const {loading, endReached, loadMore, data: messages} = chatMessagesProps || {};

        return (
            <Flex>
                <Flex.Stretch scroll='reverse' className="View--chat__messages" ref="messages" onHitBottom={() => !loading && !endReached && loadMore()}>
                    <div>
                        {loading &&
                            <Spinner infiniteScroll />
                        }
                        {this.groupMessagesByDay(messages).map((dayGroup, index) => {
                            if (dayGroup.messages.length === 0) return;

                            const readableDay = moment(dayGroup.day).calendar(null, {
                                sameDay: '[Today]',
                                lastDay: '[Yesterday]',
                                lastWeek: '[Last] dddd',
                                sameElse: 'LL'
                            });

                            return (
                                <div key={index}>
                                    <ChatDaySeparator>{readableDay}</ChatDaySeparator>
                                    {this.groupMessagesByAuthor(dayGroup.messages).map((authorGroup) => {
                                        if (authorGroup.messages.length === 0) return;

                                        const isSend = authorGroup.author.equals(loggedInUser);
                                        const authorAvatar = authorGroup.author.getAvatarImage();

                                        return this.groupMessagesByTimebox(authorGroup.messages).map((timeboxGroup, index) => {
                                            if (timeboxGroup.messages.length === 0) return;

                                            return (
                                                <ChatBox send={isSend} receive={!isSend} key={index}>
                                                    <Avatar src={authorAvatar && authorAvatar.getUrl()}></Avatar>
                                                    <List>
                                                        {timeboxGroup.messages.map((message, _index) => {
                                                            return (
                                                                <ListItem key={_index}>
                                                                    <ChatMessage message={message.content} showName={chatType === 'networks' && !isSend && _index === 0} name={authorGroup.author.profile.name} />
                                                                </ListItem>
                                                            );
                                                        })}
                                                    </List>
                                                    <time>{moment(timeboxGroup.time).format('HH:mm')}</time>
                                                </ChatBox>
                                            );
                                        });
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </Flex.Stretch>
                <Flex.Shrink className="View--chat__box">
                    <MessageForm
                        ref="messageForm"
                        initialValue={unsentMessagesPerChat[this.props.chatId]}
                        onSend={this.sendChatMessage.bind(this)}
                        onFocus={this.onMessageBoxFocus.bind(this)}
                        onBlur={this.onMessageBoxBlur.bind(this)} />
                </Flex.Shrink>
            </Flex>
        );
    }

    sendChatMessage(message) {
        delete unsentMessagesPerChat[this.props.chatId];
        this.props.sendChatMessage(message);
    }

    onMessageBoxFocus() {}
    onMessageBoxBlur() {}

    groupMessagesByAuthor(messages) {
        const {loggedInUser} = this.props;

        return groupArray(messages, (previous, current) => {
            return previous.creator_id === current.creator_id;
        }).map((messages) => {
            const author = UserModel.findOne(messages[0].creator_id);
            if (!author) return {messages: []};
            return {author, messages};
        });
    }

    groupMessagesByTimebox(messages) {
        return groupArray(messages, (previous, current) => {
            const previousMoment = moment(previous.created_at);
            const currentMoment = moment(current.created_at);

            return currentMoment.diff(previousMoment, 'seconds') <= 180;
        }).map((messages) => ({
            time: messages[0].created_at,
            messages
        }));
    }

    groupMessagesByDay(messages) {
        return groupArray(messages, (previous, current) => {
            const previousMoment = moment(previous.created_at);
            const currentMoment = moment(current.created_at);

            return previousMoment.dayOfYear() === currentMoment.dayOfYear() &&
                   previousMoment.year() === currentMoment.year();
        }).map((messages) => ({
            day: messages[0].created_at,
            messages
        }));
    }
};

ChatView.navigationBar = 'app';
ChatView.getNavigation = (props, app) => {
    const back = () => {
        transitionTo('app:tabs:chats', {
            transition: 'reveal-from-right',
            viewProps: {
                initialTabValue: props.chatType
            }
        });
    };

    setCurrentBackbuttonHandler(back);

    return {
        title: props.chatName,
        leftLabel: <NavButton left icon="icon_back" label="Chats" />,
        leftAction: back
    };
};

ChatView.propTypes = {
    chat: React.PropTypes.instanceOf(ChatModel),
    chatType: React.PropTypes.oneOf(['private', 'networks']).isRequired,
    chatMessages: React.PropTypes.shape({
        data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ChatMessageModel)).isRequired,
        loading: React.PropTypes.bool.isRequired,
        endReached: React.PropTypes.bool.isRequired,
        loadMore: React.PropTypes.func.isRequired,
        reset: React.PropTypes.func.isRequired
    }),
    chatLoading: React.PropTypes.bool.isRequired,
    sendChatMessage: React.PropTypes.func.isRequired,
    markChatAsRead: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.instanceOf(UserModel).isRequired
};

export default ChatView;
