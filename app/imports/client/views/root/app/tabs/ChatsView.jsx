'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';
import ChatTile from '/imports/client/components/ChatTile';
import Input from '/imports/client/components/Input';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import transitionTo from '/imports/client/services/transitionTo';
import NavButton from '/imports/client/components/NavButton';
import Flex from '/imports/client/components/Flex';
import Button from '/imports/client/components/Button';
import { debounce } from 'lodash';
import { ChatModel, UserModel, ChatMessageModel, NetworkModel } from '/imports/client/models';
import { filter, contains, find, reduce } from 'mout/array';
import EmptyState from '/imports/client/components/EmptyState';
import Spinner from '/imports/client/components/Spinner';
import ButtonGroup from '/imports/client/components/ButtonGroup';

const SEARCHBAR_HIDE_THRESHOLD = 4;

const ChatsView = class ChatsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: undefined,
            activeTab: 'private',
            showSearchbarHint: false,
            searchInput: ''
        };

        this.onDebouncedSearchInput = debounce(this.onDebouncedSearchInput, 500);
    }

    componentDidMount() {
        this.$scroller = $(findDOMNode(this.refs.scroller));

        const shouldScrollPastSearchbar = this.state.activeTab === 'private' && this.props.privateChats.data.length >= SEARCHBAR_HIDE_THRESHOLD;
        if (shouldScrollPastSearchbar) {
            this.scrollPastUserSearchbar();
        }
    }

    scrollPastUserSearchbar() {
        const privateChatsList = findDOMNode(this.refs.privateChatsList);

        if (privateChatsList) {
            $(privateChatsList).outerHeight(this.$scroller.height());
            const searchbar = findDOMNode(this.refs.searchbar);

            if (this.$scroller.scrollTop() < 5) {
                this.$scroller.scrollTop($(searchbar).outerHeight());

                if (!window.localStorage.getItem('learning.chat-user-searchbar')) {
                    this.setState({
                        showSearchbarHint: true
                    });
                }
            }
        }
    }

    componentDidUpdate(previousProps, previousState) {
        const shouldScrollPastSearchbar = this.state.activeTab === 'private' && this.props.privateChats.data.length >= SEARCHBAR_HIDE_THRESHOLD;

        if (previousProps.initialTabValue !== this.props.initialTabValue) {
            this.setState({
                activeTab: this.props.initialTabValue || 'private'
            });
        }

        if (previousState.activeTab !== this.state.activeTab) {

            // If tab changed to 'private', scroll past the searchbar
            setTimeout(() => {
                if (shouldScrollPastSearchbar) {
                    this.scrollPastUserSearchbar();
                } else {
                    this.$scroller.scrollTop(0);
                }
            }, 0);
        }
    }

    render() {
        const chatsProps = this.props.privateChats;
        const {loading, loadMore, endReached} = chatsProps || {};

        const sum = (chats) => reduce(chats, (prev, chat) => prev + chat.newChatMessagesCount, 0);
        const privateCount = sum(this.props.privateChats.data);
        const networksCount = sum(this.props.networkChats.data);

        return (
            <Flex>
                <Flex.Shrink className="View--chats__tabs">
                    <ButtonGroup buttons={[
                        {key: 'private', label: (
                            <span>
                                Personal
                                {!!privateCount &&
                                    <span>{`(${privateCount})`}</span>
                                }
                            </span>
                        )},
                        {key: 'networks', label: (
                            <span>
                                Tribe
                                {!!networksCount &&
                                    <span>{`(${networksCount})`}</span>
                                }
                            </span>
                        )}
                    ]} activeTab={this.state.activeTab} onClick={this.onTabClick.bind(this)} />
                </Flex.Shrink>
                {this.state.activeTab === 'private' ?
                    this.renderPrivateChats() :
                    this.renderNetworkChats()
                }
            </Flex>
        );
    }

    renderSearchResults() {
        if (this.state.searchResults.length === 0) {
            return <EmptyState type="chats-search-results" />;
        }

        const chatsProps = this.props.privateChats;
        const {data: chats} = chatsProps || {};

        return (
            <List>
                {this.state.searchResults.map((user, index) => {
                    const chat = chats.find((chat) => chat.otherUser && user.equals(chat.otherUser));

                    if (chat) {
                        return (
                            <ListItem key={index}>
                                {this.renderPrivateChatTile(chat)}
                            </ListItem>
                        );
                    }

                    return (
                        <ListItem key={index}>
                            {user &&
                                <ChatTile
                                    isUserSearchResult
                                    user={user}
                                    loggedInUser={this.props.loggedInUser}
                                    onClick={this.props.onStartPrivateChat.bind(this, user)} />
                            }
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    renderPrivateChats() {
        const chatsProps = this.props.privateChats;
        const {data: chats, loading, loadMore, endReached} = chatsProps || {};

        const onHitBottom = () => {
            if (!this.state.searchResults) {
                if (!loading && !endReached) {
                    loadMore();
                }
            }
        };

        const onSearchFocus = () => this.props.toggleTabs(false);
        const onSearchBlur = () => this.props.toggleTabs(true);

        return (
            <Flex.Stretch scroll ref="scroller" className="View--chats__list" onHitBottom={onHitBottom.bind(this)}>
                <div className="View--chats__search" ref="searchbar">
                    <Input.Text
                        icon='icon_user_add'
                        placeholder="Search user"
                        onChange={this.onSearchInput.bind(this)}
                        onFocus={onSearchFocus}
                        onBlur={onSearchBlur}
                        showClearButton={this.state.searchInput.length > 0}
                        onClear={this.onClearSearch.bind(this)} />
                </div>

                {this.state.showSearchbarHint &&
                    <div className="View--chats__search-hint">
                        {this.renderSearchBarHint()}
                    </div>
                }

                <div ref="privateChatsList">
                    {this.state.searchResults ?
                        this.renderSearchResults() :
                        (
                            <div>
                                {(!chats || !chats.length) &&
                                    <EmptyState type="chats-private" />
                                }

                                {this.renderPrivateChatsList(chats || [])}

                                {loading &&
                                    <Spinner infiniteScroll />
                                }
                            </div>
                    )}
                </div>
            </Flex.Stretch>
        );
    }

    renderSearchBarHint() {
        return <Button hint icon='icon_close' onClick={this.onSearchBarHintClick.bind(this)}>Scroll up to search user</Button>;
    }

    onSearchBarHintClick() {
        window.localStorage.setItem('learning.chat-user-searchbar', true);
        this.setState({
            showSearchbarHint: false
        });
    }

    renderPrivateChatsList(chats) {
        return (
            <List>
                {chats.map((chat, index) => {
                    return (
                        <ListItem key={index}>
                            {this.renderPrivateChatTile(chat)}
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    renderPrivateChatTile(chat) {
        if (!chat || !chat.otherUser) return;

        return <ChatTile
            chat={chat.document}
            user={chat.otherUser}
            lastChatMessage={chat.lastChatMessage}
            lastChatMessageUser={chat.lastChatMessageUser}
            loggedInUser={this.props.loggedInUser}
            onClick={this.onChatTileClick.bind(this, chat.document, chat.otherUser.profile.name, 'private')}
            newChatMessagesCount={chat.newChatMessagesCount} />;
    }

    renderNetworkChats() {
        const chatsProps = this.props.networkChats;
        const {data: chats, loading, endReached, loadMore} = chatsProps || {};

        const onHitBottom = () => {
            if (!this.state.searchResults) {
                if (!loading && !endReached) {
                    loadMore();
                }
            }
        };

        return (
            <Flex.Stretch scroll ref="scroller" className="View--chats__list" onHitBottom={onHitBottom.bind(this)}>
                {(!chats || !chats.length) &&
                    <EmptyState type="chats-networks" />
                }

                {this.renderNetworkChatsList(chats || [])}

                {loading &&
                    <Spinner infiniteScroll />
                }
            </Flex.Stretch>
        );
    }

    renderNetworkChatsList(chats) {
        return (
            <List>
                {chats.map((chat, index) => {
                    return (
                        <ListItem key={index}>
                            {chat && chat.network &&
                                <ChatTile
                                    chat={chat.document}
                                    network={chat.network}
                                    lastChatMessage={chat.lastChatMessage}
                                    lastChatMessageUser={chat.lastChatMessageUser}
                                    loggedInUser={this.props.loggedInUser}
                                    onClick={this.onChatTileClick.bind(this, chat.document, chat.network.name, 'networks', chat.network.slug)}
                                    newChatMessagesCount={chat.newChatMessagesCount} />
                            }
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    onSearchInput(event) {
        const input = event.nativeEvent.target.value;
        this.setState({searchInput: input});
        this.onDebouncedSearchInput(input);
    }

    onClearSearch() {
        this.setState({searchResults: undefined});
    }

    onDebouncedSearchInput(input) {
        if (input) {
            this.props.onSearchUsers(input, (error, users) => {
                if (error) {
                    throw error;
                }

                this.setState({searchResults: users});
            });
        } else {
            this.setState({searchResults: undefined});
        }
    }

    onChatTileClick(chat, chatName, type, networkSlug) {
        transitionTo('app:chat', {
            transition: 'show-from-right',
            viewProps: {
                chatId: chat._id,
                chatName: chatName,
                chatType: type,
                networkSlug: networkSlug
            }
        });
    }

    onTabClick(tab) {
        this.setState({
            activeTab: tab
        });
    }
};

const chatsShape = React.PropTypes.shape({
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
        document: React.PropTypes.instanceOf(ChatModel).isRequired,
        lastChatMessage: React.PropTypes.instanceOf(ChatMessageModel),
        lastChatMessageUser: React.PropTypes.instanceOf(UserModel),
        newChatMessagesCount: React.PropTypes.number.isRequired,
        otherUser: React.PropTypes.instanceOf(UserModel),
        network: React.PropTypes.instanceOf(NetworkModel)
    })).isRequired,
    loading: React.PropTypes.bool.isRequired,
    endReached: React.PropTypes.bool.isRequired,
    loadMore: React.PropTypes.func.isRequired
});

ChatsView.propTypes = {
    loggedInUser: React.PropTypes.instanceOf(UserModel),
    onSearchUsers: React.PropTypes.func.isRequired,
    onStartPrivateChat: React.PropTypes.func.isRequired,
    privateChats: chatsShape,
    networkChats: chatsShape,
    toggleTabs: React.PropTypes.func.isRequired
};

ChatsView.navigationBar = 'app';
ChatsView.getNavigation = (props, app) => {
    return {
        title: 'Chat',
        rightLabel: <NavButton right icon="icon_info" />,
        rightAction: () => {
            app.transitionTo('root:about-modal', {
                transition: 'show-from-bottom'
            });
        }
    };
};

export default ChatsView;
