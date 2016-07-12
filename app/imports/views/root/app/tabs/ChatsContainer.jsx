'use strict';

import { ReactiveVar } from 'meteor/reactive-var';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import ChatsView from './ChatsView';
import Connection from '/imports/Connection';
import Debug from '/imports/Debug';
import Subs from '/imports/Subs';
import { UserModel, ChatModel, ChatMessageModel, ImageModel, NetworkModel } from '/imports/models';
import transitionTo from '/imports/services/transitionTo';
import { find, reduce } from 'mout/array';
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
            networks: {
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
     * Subscribe to network chats
     */
    const networkChatsLoading = !Subs.subscribe('chats.for_loggedin_user', {networks: true}, {
        limit: cache.networks.limit.get()
    }, {
        onReady: () => {
            if (networkChats.length === getNetworkChats().length) {
                cache.networks.endReached.set(true);
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
     * Function to get network chats
     */
    const getNetworkChats = () => {
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
    let networkChats = [];

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
        networkChats = getNetworkChats().map(mapChats);
    }

    const loadMorePrivateChats = () => {
        cache.private.limit.set(cache.private.limit.get() + INCREASE);
    };

    const loadMoreNetworkChats = () => {
        cache.networks.limit.set(cache.networks.limit.get() + INCREASE);
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
                    chatName: user.profile.name,
                    chatType: 'private'
                }
            });
        });
    };

    Subs.subscribe('chats.unread_messages_for_count', {private: true, networks: true});
    const sumChatMessages = (previousValue, chat) => {
        return previousValue + ChatMessageModel.query()
            .search({
                chat_id: chat._id,
                read_by: {$nin: [loggedInUser._id]}
            })
            .count()
    };
    const unreadMessages = {
        private: loggedInUser && reduce(
            ChatModel.query()
                .search(m => m.searchPrivateForUser(loggedInUser))
                .fetch(),
            sumChatMessages,
            0
        ),
        networks: loggedInUser && reduce(
            NetworkModel.query()
                .search({_id: {$in: loggedInUser.networks || []}})
                .fetch()
                .map((network) => {
                    return ChatModel.query()
                        .search(network.chat_id)
                        .findOne();
                }),
            sumChatMessages,
            0
        )
    };

    return {
        initialTabValue,
        loggedInUser,
        onSearchUsers,
        onStartPrivateChat,
        unreadMessages,
        privateChats: {
            data: privateChats,
            loading: privateChatsLoading,
            endReached: cache.private.endReached.get(),
            loadMore: loadMorePrivateChats
        },
        networkChats: {
            data: networkChats,
            loading: networkChatsLoading,
            endReached: cache.networks.endReached.get(),
            loadMore: loadMoreNetworkChats
        },
        toggleTabs: props.toggleTabs
    };
});
