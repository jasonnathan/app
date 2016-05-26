'use strict';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatView from './ChatView';
import Debug from '/imports/Debug';
import Subs from '/imports/Subs';
import Connection from '/imports/Connection';
import { UserModel, ChatModel, ChatMessageModel } from '/imports/models';

export default meteorDataContainer(ChatView, (props) => {
    const {chatId} = props;
    Debug.tracker('ChatContainer');

    const loggedInUser = UserModel.accountsClient.user();
    const chatLoading = !Subs.subscribe('chats.by_id', chatId, {
        //
    }).ready();
    const chat = ChatModel.findOne(chatId);
    const chatUser = chat &&
        UserModel.query()
            .search({
                _id: {$ne: loggedInUser._id},
                chats: {$in: [chat._id]}
            })
            .findOne();
    const chatMessages = chat ?
        ChatMessageModel.query()
            .search(m => m.searchForChat(chat))
            .search({}, {sort: {created_at: 1}})
            .fetch() :
            [];

    const sendChatMessage = (message) => {
        Connection.call('chatmessages.insert', {
            chat_id: chatId,
            content: message
        });
    };

    return {
        chat,
        chatUser,
        chatMessages,
        chatLoading,
        sendChatMessage,
        loggedInUser
    };
});
