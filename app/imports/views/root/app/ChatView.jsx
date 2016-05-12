'use strict';

import React from 'react';
import c from 'classnames';
import { Container } from 'touchstonejs';

import NavButton from '/imports/components/NavButton';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Avatar from '/imports/components/Avatar';
import Chat from '/imports/components/Chat';
import ChatBox from '/imports/components/ChatBox';
import ChatMessage from '/imports/components/ChatMessage';

const ChatView = class ChatView extends React.Component {
    render() {
        return (
            <Container fill scrollable>
                <Chat>
                    <ChatBox send>
                        <Avatar src="http://www.haagsehonderd.nl/hh/wp-content/uploads/2014/12/Legowelt_2012_600-1-426x188.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage time='9:40'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox receive>
                        <Avatar src="http://www.haagsehonderd.nl/hh/wp-content/uploads/2014/12/Legowelt_2012_600-1-426x188.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage time='9:50'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage time='9:51'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage time='9:55'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox send>
                        <Avatar src="http://www.haagsehonderd.nl/hh/wp-content/uploads/2014/12/Legowelt_2012_600-1-426x188.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage time='10:40'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage time='10:42'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox receive>
                        <Avatar src="http://www.haagsehonderd.nl/hh/wp-content/uploads/2014/12/Legowelt_2012_600-1-426x188.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage time='10:50'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox send>
                        <Avatar src="http://www.haagsehonderd.nl/hh/wp-content/uploads/2014/12/Legowelt_2012_600-1-426x188.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage time='11:40'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage time='11:42'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                </Chat>
            </Container>
        );
    }
};

ChatView.navigationBar = 'app';
ChatView.getNavigation = (props, app) => {
    return {
        leftLabel: <NavButton left icon="icon_back" label="Chats" />,
        leftAction: () => {
            app.transitionTo('app:tabs:chats', {
                transition: 'reveal-from-right'
            });
        }
    };
};

ChatView.propTypes = {
    //
};

export default ChatView;
