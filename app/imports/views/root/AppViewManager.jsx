'use strict';

import React from 'react';
import { contains } from 'mout/array';
import { Container, UI, View, ViewManager } from 'touchstonejs';

import TabsViewManager from './app/TabsViewManager';
import NotificationContainer from './app/NotificationContainer';

export default class AppViewManager extends React.Component {
    render() {
        return (
            <Container>
                <ViewManager name="app" defaultView="tabs">
                    <View name="tabs" component={TabsViewManager} />
                    <View name="notification" component={NotificationContainer} />
                </ViewManager>
            </Container>
        );
    }
}
