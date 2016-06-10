'use strict';

import React from 'react';
import ChatTile from '/imports/components/ChatTile';
import Input from '/imports/components/Input';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import transitionTo from '/imports/services/transitionTo';
import NavButton from '/imports/components/NavButton';
import Flex from '/imports/components/Flex';
import Button from '/imports/components/Button';
import { debounce } from 'lodash';
import { ChatModel, UserModel, ChatMessageModel } from '/imports/models';
import { filter, contains, find } from 'mout/array';
import EmptyState from '/imports/components/EmptyState';
import Spinner from '/imports/components/Spinner';

const ChatsView = class ChatsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: undefined
        };

        this.onDebouncedSearchInput = debounce(this.onDebouncedSearchInput, 500);
    }

    render() {
        const chatsProps = this.props.chats;
        const {data: chats, loading, loadMore, endReached} = chatsProps || {};

        return (
            <Flex>
                <Flex.Shrink className="View--chats__search">
                    <Input.Text placeholder="Search users" onChange={this.onSearchInput.bind(this)} />
                </Flex.Shrink>
                {this.state.searchResults ?
                    <Flex.Stretch scroll className="View--chats__list">
                        {this.renderSearchResults()}
                    </Flex.Stretch> :
                    <Flex.Stretch scroll className="View--chats__list" onHitBottom={() => !loading && !endReached && loadMore()}>
                        {(!chats || !chats.length) &&
                            <EmptyState type="chats" />
                        }

                        {this.renderChats(chats || [])}

                        {loading &&
                            <Spinner infiniteScroll />
                        }
                    </Flex.Stretch>
                }
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
                                onClick={this.props.onStartChat.bind(this, user)} />
                        }
                    </ListItem>
                ))}
            </List>
        );
    }

    renderChats(chats) {
        return (
            <List>
                {chats.map((chat, index) => {
                    const users = filter(this.props.chatsUsers, (user) =>
                        contains(user.chats || [], chat._id));

                    const user = users.pop();

                    const lastChatMessage = find(this.props.lastChatMessages, chatMessage =>
                        chatMessage.chat_id === chat._id);

                    return (
                        <ListItem key={index}>
                            {chat && user &&
                                <ChatTile
                                    chat={chat}
                                    user={user}
                                    lastChatMessage={lastChatMessage}
                                    loggedInUser={this.props.loggedInUser}
                                    onClick={this.onChatTileClick.bind(this, chat, user)} />
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
            this.props.onSearch(input, (error, users) => {
                if (error) {
                    throw error;
                }

                this.setState({searchResults: users});
            });
        } else {
            this.setState({searchResults: undefined});
        }
    }

    onChatTileClick(chat, user) {
        transitionTo('app:chat', {
            transition: 'show-from-right',
            viewProps: {
                chatId: chat._id,
                chatUsername: user.profile.name
            }
        });
    }
};

ChatsView.propTypes = {
    loggedInUser: React.PropTypes.instanceOf(UserModel).isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onStartChat: React.PropTypes.func.isRequired,
    chats: React.PropTypes.shape({
        data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ChatModel)).isRequired,
        loading: React.PropTypes.bool.isRequired,
        endReached: React.PropTypes.bool.isRequired,
        loadMore: React.PropTypes.func.isRequired
    }),
    chatsUsers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(UserModel)).isRequired,
    lastChatMessages: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ChatMessageModel)).isRequired
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
