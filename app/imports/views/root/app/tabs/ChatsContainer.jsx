'use strict';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatsView from './ChatsView';
import Connection from '/imports/Connection';
import Debug from '/imports/Debug';
import Subs from '/imports/Subs';
import { UserModel, ChatModel, ChatMessageModel } from '/imports/models';
import transitionTo from '/imports/services/transitionTo';
import { find } from 'mout/array';
import { isFunction } from 'mout/lang';

export default meteorDataContainer(ChatsView, (props) => {
    const {} = props;
    Debug.tracker('ChatsContainer');

    const loggedInUser = UserModel.accountsClient.user();
    const chatsLoading = !Subs.subscribe('chats.for_loggedin_user').ready();

    let chats = [];
    let chatsUsers = [];
    let lastChatMessages = [];
    if (loggedInUser) {
        chats = ChatModel.query()
            .search(m => m.searchPrivateForUser(loggedInUser))
            .fetch();

        chatsUsers = UserModel.query()
            .search({chats: {$in: chats.map(c => c._id)}})
            .fetch();

        lastChatMessages = ChatMessageModel.query()
            .search({chat_id: {$in: chats.map(c => c._id)}})
            .fetch();
    }

    const onSearch = (input, callback) => {
        Connection.call('users.autocomplete', input, undefined, undefined, {chatSearch: true}, (error, users) => {
            if (error) {
                if (isFunction(callback)) callback(error);
                return;
            }

            if (isFunction(callback)) callback(null, users.map(user => new UserModel(user)));
        });
    };

    const onStartChat = (user, callback) => {
        Connection.call('chats.start_with_users', [user._id], function(error, chatId) {
            if (!chatId) {
                error = new Error('Could not create chat');
            }

            if (error) {
                if (isFunction(callback)) callback(error);
                return;
            }

            if (isFunction(callback)) {
                console.log(callback);
                callback(null, chatId);
            }
            transitionTo('app:chat', {
                transition: 'show-from-right',
                viewProps: {chatId}
            });
        });
    };

    return {
        loggedInUser,
        onSearch,
        onStartChat,
        chatsLoading,
        chats,
        chatsUsers,
        lastChatMessages
    };
});
