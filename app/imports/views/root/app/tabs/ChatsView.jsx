'use strict';

import React from 'react';

import Content from '/imports/components/Content';

export default class ChatsView extends React.Component {
    render() {
        return (
            <Content>
                <Content.Text>
                    <p>Chat</p>
                </Content.Text>
            </Content>
        );
    }
};

ChatsView.propTypes = {};

ChatsView.navigationBar = 'tabs';
ChatsView.getNavigation = () => {
    return {
        title: 'Chat'
    };
};
