'use strict';

import React from 'react';
import c from 'classnames';
import { Container } from 'touchstonejs';

import NavButton from '/imports/components/NavButton';

const ChatView = class ChatView extends React.Component {
    render() {
        return (
            <Container fill scrollable>
                Hier
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
