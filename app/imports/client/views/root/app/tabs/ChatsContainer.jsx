'use strict';

import { ReactiveVar } from 'meteor/reactive-var';
import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import ChatsView from './ChatsView';
import Connection from '/imports/client/Connection';
import Debug from '/imports/client/Debug';
import { UserModel, ChatModel, ChatMessageModel, ImageModel, NetworkModel } from '/imports/client/models';
import transitionTo from '/imports/client/services/transitionTo';
import { find } from 'mout/array';
import { isFunction } from 'mout/lang';
import userCache from '/imports/client/services/userCache';

const START = 10;
const INCREASE = 10;

export default meteorDataContainer(ChatsView, (props) => {
    const {initialTabValue} = props;
    Debug.tracker('ChatsContainer');

    const loggedInUser = UserModel.accountsClient.user();

    /**
     * Shared functionalities (both network-chat and private-chat)
     */
    const getLastChatMessage = (chatId) => {
        return ChatMessageModel.query()
            .search({chat_id: chatId}, {sort: {created_at: -1}, limit: 1})
            .findOne();
    };
    const getChatMessageUser = (chatMessage) => {
        return UserModel.query()
            .search(chatMessage.creator_id)
            .findOne();
    };
    const getCommonProps = (chat) => {
        const lastChatMessage = getLastChatMessage(chat._id);

        return {
            lastChatMessage,
            lastChatMessageUser: lastChatMessage && getChatMessageUser(lastChatMessage),
            newChatMessagesCount: chat.getUnreadCountForUser(loggedInUser)
        };
    };
    const chatSorter = (a, b) => {
        return b.document.updated_at - a.document.updated_at;
    };

    const getPrivateChats = () =>
        ChatModel.query()
            .search(m => m.searchPrivateForUser(loggedInUser))
            .search({}, {limit: cache.private.limit.curValue})
            .fetch()
            .map((chat) => {
                const otherUser = UserModel.query()
                    .search({
                        _id: {$ne: loggedInUser._id},
                        chats: {$in: [chat._id]}
                    })
                    .findOne();

                return {document: chat, otherUser, ...getCommonProps(chat)};
            })
            .sort(chatSorter);

    const getNetworkChats = () => {
        return NetworkModel.query()
            .search({
                uppers: {
                    $in: [loggedInUser._id]
                }
            }, {
                limit: cache.networks.limit.curValue
            })
            .fetch()
            .map((network) => {
                var chat = ChatModel.query()
                    .search({_id: network.chat_id})
                    .findOne();

                return {document: chat, network, ...getCommonProps(chat)};
            })
            .sort(chatSorter);
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
                    chatType: 'private',
                    networkSlug: undefined
                }
            });
        });
    };

    let cache = userCache.get('chatsPage');
    if (!cache) {
        cache = {
            private: {
                limit: new ReactiveVar(START),
                chats: new ReactiveVar([]),
                endReached: new ReactiveVar(false)
            },
            networks: {
                limit: new ReactiveVar(START),
                chats: new ReactiveVar([]),
                endReached: new ReactiveVar(false)
            }
        };

        userCache.set('chatsPage', cache);
    }

    /**
     * Subscription, loadMore function and loading boolean
     * for "private chats"
     */
    const privateChatsLoading = !Meteor.subscribe('chats.for_loggedin_user', {private: true}, {
        limit: cache.private.limit.get()
    }, {
        onReady: () => {
            const previousChats = cache.private.chats.curValue;
            const newChats = loggedInUser ? getPrivateChats() : [];

            if (newChats.length === previousChats.length) {
                cache.private.endReached.set(true);
            }

            cache.private.chats.set(newChats);
        }
    }).ready();
    const loadMorePrivateChats = () => {
        cache.private.limit.set(cache.private.limit.get() + INCREASE);
    };

    /**
     * Subscription, loadMore function and loading boolean
     * for "network chats"
     */
    const networkChatsLoading = !Meteor.subscribe('chats.for_loggedin_user', {networks: true}, {
        limit: cache.networks.limit.get()
    }, {
        onReady: () => {
            const previousChats = cache.networks.chats.curValue;
            const newChats = loggedInUser ? getNetworkChats() : [];

            if (newChats.length === previousChats.length) {
                cache.networks.endReached.set(true);
            }

            cache.networks.chats.set(newChats);
        }
    }).ready();
    const loadMoreNetworkChats = () => {
        cache.networks.limit.set(cache.networks.limit.get() + INCREASE);
    };

    return {
        initialTabValue,
        loggedInUser,
        onSearchUsers,
        onStartPrivateChat,
        privateChats: {
            data: cache.private.chats.get(),
            loading: privateChatsLoading,
            endReached: cache.private.endReached.get(),
            loadMore: loadMorePrivateChats
        },
        networkChats: {
            data: cache.networks.chats.get(),
            loading: networkChatsLoading,
            endReached: cache.networks.endReached.get(),
            loadMore: loadMoreNetworkChats
        },
        toggleTabs: props.toggleTabs
    };
});
