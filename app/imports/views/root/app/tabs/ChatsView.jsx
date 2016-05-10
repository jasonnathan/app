'use strict';

import React from 'react';
import Input from '/imports/components/Input';
import Content from '/imports/components/Content';

const ChatsView = class ChatsView extends React.Component {
    render() {
        return (
            <Content>
                <Input.Text name="anne" placeholder="Search Users"/>
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
