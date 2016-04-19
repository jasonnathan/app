'use strict';

import React from 'react';
import { contains } from 'mout/array';
import { Container, UI, View, ViewManager } from 'touchstonejs';

import NotificationsContainer from '/imports/views/root/tabs/NotificationsContainer';

let lastSelectedTab = 'notifications';
export default class TabsViewManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: lastSelectedTab
        };
    }

    onViewChange(nextView) {
        lastSelectedTab = nextView;

        this.setState({
            selectedTab: nextView
        });
    }

    selectTab(value) {
        let viewProps;

        this.refs.vm.transitionTo(value, {
            transition: 'instant',
            viewProps: viewProps
        });
    }

    render() {
        return (
            <Container>
                <UI.NavigationBar name="tabs" />
                <ViewManager ref="vm" name="tabs" defaultView={this.state.selectedTab} onViewChange={this.onViewChange.bind(this)}>
                    <View name="notifications" component={NotificationsContainer} />
                </ViewManager>
                <UI.Tabs.Navigator>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'notifications')} selected={contains(['notifications'], this.state.selectedTab)}>
                        <span className="Tabs-Icon Tabs-Icon--notifications" />
                        <UI.Tabs.Label>Notifications</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                </UI.Tabs.Navigator>
            </Container>
        );
    }
}
