'use strict';

import { ReactiveVar } from 'meteor/reactive-var';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatsView from './ChatsView';
import Connection from '/imports/Connection';
import Debug from '/imports/Debug';
import Subs from '/imports/Subs';
import { UserModel, ChatModel, ChatMessageModel, ImageModel, NetworkModel } from '/imports/models';
import transitionTo from '/imports/services/transitionTo';
import { find } from 'mout/array';
import { isFunction } from 'mout/lang';
import userCache from '/imports/services/userCache';

const START = 15;
const INCREASE = 10;

export default meteorDataContainer(ChatsView, (props) => {
    const {initialTabValue} = props;
    Debug.tracker('ChatsContainer');

    let cache = userCache.get('chatsPage');
    if (!cache) {
        cache = {
            private: {
                limit: new ReactiveVar(START),
                endReached: new ReactiveVar(false)
            },
            tribe: {
                limit: new ReactiveVar(START),
                endReached: new ReactiveVar(false)
            }
        };

        userCache.set('chatsPage', cache);
    }

    const loggedInUser = UserModel.accountsClient.user();

    /**
     * Subscribe to private chats
     */
    const privateChatsLoading = !Subs.subscribe('chats.for_loggedin_user', {private: true}, {
        limit: cache.private.limit.get()
    }, {
        onReady: () => {
            if (privateChats.length === getPrivateChats().length) {
                cache.private.endReached.set(true);
            }
        }
    }).ready();

    /**
     * Subscribe to tribe chats
     */
    const tribeChatsLoading = !Subs.subscribe('chats.for_loggedin_user', {networks: true}, {
        limit: cache.tribe.limit.get()
    }, {
        onReady: () => {
            if (tribeChats.length === getTribeChats().length) {
                cache.tribe.endReached.set(true);
            }
        }
    }).ready();

    /**
     * Function to get private chats
     */
    const getPrivateChats = () =>
        ChatModel.query()
            .search(m => m.searchPrivateForUser(loggedInUser))
            .fetch();

    /**
     * Function to get tribe chats
     */
    const getTribeChats = () => {
        return NetworkModel.query()
            .search({
                uppers: {
                    $in: [loggedInUser._id]
                }
            })
            .fetch()
            .map(network =>
                ChatModel.query()
                    .search({_id: network.chat_id})
                    .findOne()
            );
    };

    let privateChats = [];
    let tribeChats = [];

    if (loggedInUser) {
        const mapChats = (chat) => {
            return {
                document: chat,
                otherInvolvedUsers: UserModel.query()
                    .search({
                        _id: {$ne: loggedInUser._id},
                        chats: {$in: [chat._id]}
                    })
                    .fetch(),
                network: NetworkModel.query()
                    .search({chat_id: chat._id})
                    .findOne(),
                lastChatMessage: ChatMessageModel.query()
                    .search({chat_id: chat._id}, {sort: {created_at: -1}, limit: 1})
                    .findOne(),
                newChatMessagesCount: ChatMessageModel.query()
                    .search({chat_id: chat._id, read_by: {$nin: [loggedInUser._id]}})
                    .count()
            };
        };

        /**
         * Get and map chats
         */
        privateChats = getPrivateChats().map(mapChats);
        tribeChats = getTribeChats().map(mapChats);
    }

    const loadMorePrivateChats = () => {
        cache.private.limit.set(cache.private.limit.get() + INCREASE);
    };

    const loadMoreTribeChats = () => {
        cache.tribe.limit.set(cache.tribe.limit.get() + INCREASE);
    };

    const onSearchUsers = (input, callback) => {
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

    const onStartPrivateChat = (user, callback) => {
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
        initialTabValue,
        loggedInUser,
        onSearchUsers,
        onStartPrivateChat,
        privateChats: {
            data: privateChats,
            loading: privateChatsLoading,
            endReached: cache.private.endReached.get(),
            loadMore: loadMorePrivateChats
        },
        tribeChats: {
            data: tribeChats,
            loading: tribeChatsLoading,
            endReached: cache.tribe.endReached.get(),
            loadMore: loadMoreTribeChats
        },
        toggleTabs: props.toggleTabs
    };
});
