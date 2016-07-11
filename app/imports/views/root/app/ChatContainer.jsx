'use strict';

import { ReactiveVar } from 'meteor/reactive-var';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatView from './ChatView';
import Debug from '/imports/Debug';
import Subs from '/imports/Subs';
import Connection from '/imports/Connection';
import { UserModel, ChatModel, ChatMessageModel } from '/imports/models';

const START = 30;
const INCREASE = 15;
const limit = new ReactiveVar(START);
const endReached = new ReactiveVar(false);

export default meteorDataContainer(ChatView, (props) => {
    const {chatId} = props;
    Debug.tracker('ChatContainer');

    const resetInfiniteScroll = () => {
        limit.set(START);
        endReached.set(false);
    };

    const loggedInUser = UserModel.accountsClient.user();
    const chatLoading = !Subs.subscribe('chats.by_id', chatId, {
        limit: limit.get()
    }, {
        onReady: () => {
            if (chatMessages.length === getChatMessages().length) {
                endReached.set(true);
            }
        }
    }).ready();
    const chat = ChatModel.findOne(chatId);

    const sendChatMessage = (message) => {
        if (message) {
            Connection.call('chatmessages.insert', {
                chat_id: chatId,
                content: message
            });
        }
    };

    const markMessageAsRead = (message) => {
        Connection.call('chatmessages.read', message._id);
    };

    const getChatMessages = () =>
        chat ?
            ChatMessageModel.query()
                .search(m => m.searchForChat(chat))
                .search({}, {sort: {created_at: 1}})
                .fetch() :
            [];

    const chatMessages = getChatMessages();

    const loadMoreChatMessages = () => {
        limit.set(limit.get() + INCREASE);
    };

    return {
        chat,
        chatMessages: {
            data: chatMessages,
            loading: chatLoading,
            endReached: endReached.get(),
            loadMore: loadMoreChatMessages,
            reset: resetInfiniteScroll
        },
        chatLoading,
        sendChatMessage,
        markMessageAsRead,
        loggedInUser
    };
});
