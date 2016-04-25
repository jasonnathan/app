'use strict';

import React from 'react';
import { contains } from 'mout/array';
import { Container, UI, View, ViewManager } from 'touchstonejs';
import c from 'classnames';

import NotificationsContainer from './tabs/NotificationsContainer';
import ChatsContainer from './tabs/ChatsContainer';
import PartupsContainer from './tabs/PartupsContainer';
import TribesContainer from './tabs/TribesContainer';
import Svg from '/imports/components/Svg';

const TabsViewManager = class TabsViewManager extends React.Component {
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
                        <Svg name="icon_notifications" />
                        <UI.Tabs.Label>Notificaties</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'chat')} selected={selectedIsOneOf(['chat'])}>
                        <Svg name="icon_message" />
                        <UI.Tabs.Label>Chat</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'partups')} selected={selectedIsOneOf(['partups'])}>
                        <Svg name="icon_part-up" />
                        <UI.Tabs.Label>Part-ups</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'tribes')} selected={selectedIsOneOf(['tribes'])}>
                        <Svg name="icon_tribe" />
                        <UI.Tabs.Label>Tribes</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                </UI.Tabs.Navigator>
            </Container>
        );
    }
}

TabsViewManager.lastSelectedTab = 'notifications';

export default TabsViewManager;
