'use strict';

import { ReactiveVar } from 'meteor/reactive-var';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatsView from './ChatsView';
import Connection from '/imports/Connection';
import Debug from '/imports/Debug';
import Subs from '/imports/Subs';
import { UserModel, ChatModel, ChatMessageModel, ImageModel } from '/imports/models';
import transitionTo from '/imports/services/transitionTo';
import { find } from 'mout/array';
import { isFunction } from 'mout/lang';
import userCache from '/imports/services/userCache';

const START = 15;
const INCREASE = 10;

export default meteorDataContainer(ChatsView, (props) => {
    const {} = props;
    Debug.tracker('ChatsContainer');

    let cache = userCache.get('chatsPage');
    if (!cache) {
        cache = {
            limit: new ReactiveVar(START),
            endReached: new ReactiveVar(false)
        };

        userCache.set('chatsPage', cache);
    }

    const loggedInUser = UserModel.accountsClient.user();
    const chatsLoading = !Subs.subscribe('chats.for_loggedin_user', {private: true}, {
        limit: cache.limit.get()
    }, {
        onReady: () => {
            if (chats.length === getChats().length) {
                cache.endReached.set(true);
            }
        }
    }).ready();

    const getChats = () =>
        ChatModel.query()
            .search(m => m.searchPrivateForUser(loggedInUser))
            .fetch();

    let chats = [];
    if (loggedInUser) {
        chats = getChats()
            .map(chat => {
                return {
                    document: chat,
                    otherInvolvedUsers: UserModel.query()
                        .search({
                            _id: {$ne: loggedInUser._id},
                            chats: {$in: [chat._id]}
                        })
                        .fetch(),
                    lastChatMessage: ChatMessageModel.query()
                        .search({chat_id: chat._id}, {sort: {created_at: -1}, limit: 1})
                        .findOne(),
                    newChatMessagesCount: ChatMessageModel.query()
                        .search({chat_id: chat._id, read_by: {$nin: [loggedInUser._id]}})
                        .count()
                };
            });
    }

    const loadMoreChats = () => {
        cache.limit.set(cache.limit.get() + INCREASE);
    };

    const onSearch = (input, callback) => {
        Connection.call('users.autocomplete', input, undefined, undefined, {chatSearch: true}, (error, users) => {
            if (error) {
                if (isFunction(callback)) callback(error);
                return;
            }

            const _users = users.map(_user => {
                const user = new UserModel(_user);
                user.getAvatarImage = () => new ImageModel(user.embeddedImage);
                return user;
            });

            if (isFunction(callback)) callback(null, _users);
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
                callback(null, chatId);
            }

            transitionTo('app:chat', {
                transition: 'show-from-right',
                viewProps: {
                    chatId,
                    chatUsername: user.profile.name
                }
            });
        });
    };

    return {
        loggedInUser,
        onSearch,
        onStartChat,
        chats: {
            data: chats,
            loading: chatsLoading,
            endReached: cache.endReached.get(),
            loadMore: loadMoreChats
        }
    };
});
