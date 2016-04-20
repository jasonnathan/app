'use strict';

import React from 'react';
import { contains } from 'mout/array';
import { Container, UI, View, ViewManager } from 'touchstonejs';

import NotificationsContainer from './tabs/NotificationsContainer';
import ChatsContainer from './tabs/ChatsContainer';
import PartupsContainer from './tabs/PartupsContainer';
import TribesContainer from './tabs/TribesContainer';

export default class TabsViewManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: TabsViewManager.lastSelectedTab
        };
    }

    onViewChange(nextView) {
        TabsViewManager.lastSelectedTab = nextView;

        this.setState({
            selectedTab: nextView
        });
    }

    selectTab(value) {
        this.refs.vm.transitionTo(value, {
            transition: 'instant'
        });

        this.setState({
            selectedTab: value
        });
    }

    render() {
        const selectedIsOneOf = (arr) => contains(arr, this.state.selectedTab);

        return (
            <Container>
                <UI.NavigationBar name="tabs" />
                <ViewManager ref="vm" name="tabs" defaultView={this.state.selectedTab} onViewChange={this.onViewChange.bind(this)}>
                    <View name="notifications" component={NotificationsContainer} />
                    <View name="chat" component={ChatsContainer} />
                    <View name="partups" component={PartupsContainer} />
                    <View name="tribes" component={TribesContainer} />
                </ViewManager>
                <UI.Tabs.Navigator>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'notifications')} selected={selectedIsOneOf(['notifications'])}>
                        <span className="Tabs-Icon Tabs-Icon--notifications" />
                        <UI.Tabs.Label>Notificaties</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'chat')} selected={selectedIsOneOf(['chat'])}>
                        <span className="Tabs-Icon Tabs-Icon--chat" />
                        <UI.Tabs.Label>Chat</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'partups')} selected={selectedIsOneOf(['partups'])}>
                        <span className="Tabs-Icon Tabs-Icon--partups" />
                        <UI.Tabs.Label>Part-ups</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'tribes')} selected={selectedIsOneOf(['tribes'])}>
                        <span className="Tabs-Icon Tabs-Icon--tribes" />
                        <UI.Tabs.Label>Tribes</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                </UI.Tabs.Navigator>
            </Container>
        );
    }
}

TabsViewManager.lastSelectedTab = 'notifications';
