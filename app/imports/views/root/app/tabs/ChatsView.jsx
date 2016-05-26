'use strict';

import React from 'react';
import ChatTile from '/imports/components/ChatTile';
import Input from '/imports/components/Input';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import transitionTo from '/imports/services/transitionTo';
import Flex from '/imports/components/Flex';

const ChatsView = class ChatsView extends React.Component {
    render() {
        return (
            <Flex>
                <Flex.Shrink className="View--chats__search">
                    <Input.Text placeholder="Search Users" />
                </Flex.Shrink>
                <Flex.Stretch scroll className="View--chats__list">
                    <List>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                        <ListItem>
                            <ChatTile onClick={this.onChatTileClick.bind(this)} />
                        </ListItem>
                    </List>
                </Flex.Stretch>
            </Flex>
        );
    }

    onChatTileClick() {
        transitionTo('app:chat', {
            transition: 'show-from-right',
            viewProps: {}
        });
    }
};

ChatsView.propTypes = {
    //
};

ChatsView.propTypes = {
    //
};

ChatsView.navigationBar = 'app';
ChatsView.getNavigation = () => {
    return {
        title: 'Chat'
    };
};

export default ChatsView;
