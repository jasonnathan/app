'use strict';

import React from 'react';

import Content from '/imports/components/Content';
import Paragraph from '/imports/components/Paragraph';

const ChatsView = class ChatsView extends React.Component {
    render() {
        return (
            <Content>
                <Content.Text>
                    <Paragraph>Chat is under construction</Paragraph>
                </Content.Text>
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
