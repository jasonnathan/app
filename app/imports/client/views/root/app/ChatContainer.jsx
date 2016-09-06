'use strict';

import { ReactiveVar } from 'meteor/reactive-var';
import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import ChatView from './ChatView';
import Debug from '/imports/client/Debug';
import Subs from '/imports/client/Subs';
import Connection from '/imports/client/Connection';
import { UserModel, ChatModel, ChatMessageModel } from '/imports/client/models';

const START = 30;
const INCREASE = 15;
const limit = new ReactiveVar(START);
const endReached = new ReactiveVar(false);

export default meteorDataContainer(ChatView, (props) => {
    const {chatId, chatType, networkSlug} = props;
    Debug.tracker('ChatContainer');

    const resetInfiniteScroll = () => {
        limit.set(START);
        endReached.set(false);
    };

    const loggedInUser = UserModel.accountsClient.user();

    let chatLoading;
    const options = {
        limit: limit.get()
    };
    const callbacks = {
        onReady: () => {
            if (chatMessages.length === getChatMessages().length) {
                endReached.set(true);
            }
        }
    };

    if (chatType === 'private') {
        chatLoading = !Subs.subscribe('chats.by_id', chatId, options, callbacks).ready();
    } else if (chatType === 'networks') {
        chatLoading = !Subs.subscribe('networks.one.chat', networkSlug, options, callbacks).ready();
    }

    const chat = ChatModel.findOne(chatId);

    const sendChatMessage = (message) => {
        if (message) {
            Connection.call('chatmessages.insert', {
                chat_id: chatId,
                content: message
            });
        }
    };

    const markChatAsRead = () => {
        Connection.call('chats.reset_counter', chatId);
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
        chatType,
        chatMessages: {
            data: chatMessages,
            loading: chatLoading,
            endReached: endReached.get(),
            loadMore: loadMoreChatMessages,
            reset: resetInfiniteScroll
        },
        chatLoading,
        sendChatMessage,
        markChatAsRead,
        loggedInUser
    };
});
