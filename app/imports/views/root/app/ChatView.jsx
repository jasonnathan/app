'use strict';

import React from 'react';
import c from 'classnames';
import { Container } from 'touchstonejs';

import NavButton from '/imports/components/NavButton';
import Button from '/imports/components/Button';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Avatar from '/imports/components/Avatar';
import Chat from '/imports/components/Chat';
import ChatBox from '/imports/components/ChatBox';
import ChatMessage from '/imports/components/ChatMessage';
import ChatFooter from '/imports/components/ChatFooter';
import Input from '/imports/components/Input';

const ChatView = class ChatView extends React.Component {
    render() {
        return (
            <Container fill scrollable>
                <Chat>
                    <ChatBox send>
                        <Avatar src="https://i.ytimg.com/vi/7oDULJHivIo/hqdefault.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage message='Blabla text in a chat box yes thats what we want!' time='9:40'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox receive>
                        <Avatar src="https://i.ytimg.com/vi/7oDULJHivIo/hqdefault.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage message='Blabla text in a chat box' time='9:50'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage message='Blabla text ' time='9:51'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage message='Blabla text in a chat box text in a chat box text in a chat box' time='9:55'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox send>
                        <Avatar src="https://i.ytimg.com/vi/7oDULJHivIo/hqdefault.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage message='Blabla text in a chat box text in a chat box text in a chat box. Blabla text in a chat box text in a chat box text in a chat box. Blabla text in a chat box text in a chat box text in a chat box.' time='10:40'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage message='Blabla text' time='10:42'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox receive>
                        <Avatar src="https://i.ytimg.com/vi/7oDULJHivIo/hqdefault.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage message='Blabla text in a chat box' time='10:50'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox send>
                        <Avatar src="https://i.ytimg.com/vi/7oDULJHivIo/hqdefault.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage message='Blabla' time='11:40'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage message='Blablablablablablablabla' time='11:42'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatBox receive>
                        <Avatar src="https://i.ytimg.com/vi/7oDULJHivIo/hqdefault.jpg"></Avatar>
                        <List>
                            <ListItem>
                                <ChatMessage message='Blabla text in a chat box' time='10:50'/>
                            </ListItem>
                            <ListItem>
                                <ChatMessage message='Blablablablablablablabla Blablablablablablablabla' time='11:42'/>
                            </ListItem>
                        </List>
                    </ChatBox>
                    <ChatFooter>
                        <Input.Text placeholder="Send message..."/>
                        <Button>Send</Button>
                    </ChatFooter>
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
