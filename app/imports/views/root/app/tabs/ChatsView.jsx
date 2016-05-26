'use strict';

import React from 'react';
import ChatTile from '/imports/components/ChatTile';
import Input from '/imports/components/Input';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import transitionTo from '/imports/services/transitionTo';
import Flex from '/imports/components/Flex';
import Button from '/imports/components/Button';
import { debounce } from 'lodash';
import { ChatModel, UserModel, ChatMessageModel } from '/imports/models';
import { filter, contains, find } from 'mout/array';

const ChatsView = class ChatsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: []
        };

        this.onDebouncedSearchInput = debounce(this.onDebouncedSearchInput, 500);
    }

    render() {
        return (
            <Flex>
                <Flex.Shrink className="View--chats__search">
                    <Input.Text placeholder="Search users" onChange={this.onSearchInput.bind(this)} />
                </Flex.Shrink>
                <Flex.Stretch scroll className="View--chats__list">
                    {this.state.searchResults.length > 0 ?
                        this.renderSearchResults() :
                        this.renderChats()}
                </Flex.Stretch>
            </Flex>
        );
    }

    renderSearchResults() {
        return (
            <List>
                {this.state.searchResults.map((user, index) => (
                    <ListItem key={index}>
                        <div style={{padding: '15px'}}>
                            <Button onClick={this.props.onStartChat.bind(this, user)}>
                                {user.profile.name}
                            </Button>
                        </div>
                    </ListItem>
                ))}
            </List>
        );
    }

    renderChats() {
        return (
            <List>
                {this.props.chats.map((chat, index) => {
                    const users = filter(this.props.chatsUsers, (user) =>
                        contains(user.chats || [], chat._id) &&
                        !user.equals(this.props.loggedInUser));

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
                                    onClick={this.onChatTileClick.bind(this, chat)} />
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
            this.setState({searchResults: []});
        }
    }

    onChatTileClick(chat) {
        transitionTo('app:chat', {
            transition: 'show-from-right',
            viewProps: {chat_id: chat._id}
        });
    }
};

ChatsView.propTypes = {
    loggedInUser: React.PropTypes.instanceOf(UserModel).isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onStartChat: React.PropTypes.func.isRequired,
    chatsLoading: React.PropTypes.bool.isRequired,
    chats: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ChatModel)).isRequired,
    chatsUsers: React.PropTypes.arrayOf(React.PropTypes.instanceOf(UserModel)).isRequired,
    lastChatMessages: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ChatMessageModel)).isRequired
};

ChatsView.navigationBar = 'app';
ChatsView.getNavigation = () => {
    return {
        title: 'Chat'
    };
};

export default ChatsView;
