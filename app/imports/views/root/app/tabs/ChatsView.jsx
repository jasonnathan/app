'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';
import ChatTile from '/imports/components/ChatTile';
import Input from '/imports/components/Input';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import transitionTo from '/imports/services/transitionTo';
import NavButton from '/imports/components/NavButton';
import Flex from '/imports/components/Flex';
import Button from '/imports/components/Button';
import { debounce } from 'lodash';
import { ChatModel, UserModel, ChatMessageModel, NetworkModel } from '/imports/models';
import { filter, contains, find, reduce } from 'mout/array';
import EmptyState from '/imports/components/EmptyState';
import Spinner from '/imports/components/Spinner';
import ButtonGroup from '/imports/components/ButtonGroup';

const ChatsView = class ChatsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: undefined,
            activeTab: 'private'
        };

        this.onDebouncedSearchInput = debounce(this.onDebouncedSearchInput, 500);
    }

    componentDidMount() {
        this.$scroller = $(findDOMNode(this.refs.scroller));
        this.scrollPastSearchbar();
    }

    scrollPastSearchbar() {
        const privateChatsList = findDOMNode(this.refs.privateChatsList);

        if (privateChatsList) {
            $(privateChatsList).outerHeight(this.$scroller.height());
            const searchbar = findDOMNode(this.refs.searchbar);

            if (this.$scroller.scrollTop() < 5) {
                this.$scroller.scrollTop($(searchbar).outerHeight());
            }
        }
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.initialTabValue !== this.props.initialTabValue) {
            this.setState({
                activeTab: this.props.initialTabValue || 'private'
            });
        }

        if (previousState.activeTab !== this.state.activeTab) {

            // If tab changed to 'private', scroll past the searchbar
            if (this.state.activeTab === 'private') {
                setTimeout(() => {
                    this.scrollPastSearchbar();
                }, 0);
            }
        }
    }

    render() {
        const chatsProps = this.props.privateChats;
        const {loading, loadMore, endReached} = chatsProps || {};

        const onHitBottom = () => {
            if (!this.state.searchResults) {
                if (!loading && !endReached) {
                    loadMore();
                }
            }
        };

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
                <Flex.Stretch scroll ref="scroller" className="View--chats__list" onHitBottom={onHitBottom.bind(this)}>
                    {this.state.activeTab === 'private'
                        ? this.renderPrivateChats()
                        : this.renderNetworkChats()
                    }
                </Flex.Stretch>
            </Flex>
        );
    }

    renderSearchResults() {
        if (this.state.searchResults.length === 0) {
            return <EmptyState type="chats-search-results" />;
        }

        return (
            <List>
                {this.state.searchResults.map((user, index) => (
                    <ListItem key={index}>
                        {user &&
                            <ChatTile
                                user={user}
                                loggedInUser={this.props.loggedInUser}
                                onClick={this.props.onStartPrivateChat.bind(this, user)} />
                        }
                    </ListItem>
                ))}
            </List>
        );
    }

    renderPrivateChats() {
        const chatsProps = this.props.privateChats;
        const {data: chats, loading} = chatsProps || {};

        const onSearchFocus = () => this.props.toggleTabs(false);
        const onSearchBlur = () => this.props.toggleTabs(true);

        return (
            <div>
                <div className="View--chats__search" ref="searchbar">
                    <Input.Text placeholder="Search users" onChange={this.onSearchInput.bind(this)} icon='icon_search' onFocus={onSearchFocus} onBlur={onSearchBlur} />
                </div>

                <div ref="privateChatsList">
                    {this.state.searchResults
                        ? this.renderSearchResults()
                        : (
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
            </div>
        );
    }

    renderPrivateChatsList(chats) {
        return (
            <List>
                {chats.map((chat, index) => {
                    return (
                        <ListItem key={index}>
                            {chat && chat.otherUser &&
                                <ChatTile
                                    chat={chat.document}
                                    user={chat.otherUser}
                                    lastChatMessage={chat.lastChatMessage}
                                    lastChatMessageUser={chat.lastChatMessageUser}
                                    loggedInUser={this.props.loggedInUser}
                                    onClick={this.onChatTileClick.bind(this, chat.document, chat.otherUser.profile.name, 'private')}
                                    newChatMessagesCount={chat.newChatMessagesCount} />
                            }
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    renderNetworkChats() {
        const chatsProps = this.props.networkChats;
        const {data: chats, loading} = chatsProps || {};

        return (
            <div>
                {(!chats || !chats.length) &&
                    <EmptyState type="chats-networks" />
                }

                {this.renderNetworkChatsList(chats || [])}

                {loading &&
                    <Spinner infiniteScroll />
                }
            </div>
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
        this.onDebouncedSearchInput(input);
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
    loggedInUser: React.PropTypes.instanceOf(UserModel).isRequired,
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
