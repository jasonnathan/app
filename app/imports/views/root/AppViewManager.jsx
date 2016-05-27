'use strict';

import React from 'react';
import { contains } from 'mout/array';
import { Container, UI, View, ViewManager } from '/imports/touchstonejs/lib';

import TabsViewManager from './app/TabsViewManager';
import NotificationContainer from './app/NotificationContainer';
import ChatContainer from './app/ChatContainer';

const AppViewManager = class AppViewManager extends React.Component {
    render() {
        return (
            <Container>
                <UI.NavigationBar name="app" />
                <ViewManager name="app" defaultView="tabs">
                    <View name="tabs" component={TabsViewManager} />
                    <View name="notification" component={NotificationContainer} />
                    <View name="chat" component={ChatContainer} />
                </ViewManager>
            </Container>
        );
    }
};

export default AppViewManager;
