'use strict';

import React from 'react';
import ChatTile from '/imports/components/ChatTile';
import Content from '/imports/components/Content';
import Input from '/imports/components/Input';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';

const ChatsView = class ChatsView extends React.Component {
    render() {
        return (
            <Content>
                <Input.Text name="anne" placeholder="Search Users"/>
                <List>
                    <ListItem>
                        <ChatTile>

                        </ChatTile>
                    </ListItem>
                </List>
            </Content>
        );
    }
};

ChatsView.propTypes = {
};

ChatsView.navigationBar = 'app';
ChatsView.getNavigation = () => {
    return {
        title: 'Chat'
    };
};

export default ChatsView;
