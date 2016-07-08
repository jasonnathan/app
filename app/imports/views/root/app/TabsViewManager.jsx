'use strict';

import React from 'react';
import { contains } from 'mout/array';
import { Container, UI, View, ViewManager } from '/imports/touchstonejs/lib';
import c from 'classnames';

import NotificationsContainer from './tabs/NotificationsContainer';
import ChatsContainer from './tabs/ChatsContainer';
import PartupsContainer from './tabs/PartupsContainer';
import TribesContainer from './tabs/TribesContainer';
import Svg from '/imports/components/Svg';
import setCurrentBackbuttonHandler from '/imports/services/setCurrentBackbuttonHandler';
import { ChatMessageModel, UserModel } from '/imports/models';

const TabsViewManager = class TabsViewManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: TabsViewManager.lastSelectedTab
        };
    }

    componentDidMount() {
        setCurrentBackbuttonHandler(undefined);
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

        const loggedInUser = UserModel.accountsClient.user();
        const unreadChatMessagesCount = loggedInUser && ChatMessageModel.query()
            .search({read_by: {$nin: [loggedInUser._id]}})
            .count();

        return (
            <Container>
                <ViewManager ref="vm" name="tabs" defaultView={this.state.selectedTab} onViewChange={this.onViewChange.bind(this)}>
                    <View name="notifications" component={NotificationsContainer} />
                    <View name="chats" component={ChatsContainer} />
                    <View name="partups" component={PartupsContainer} />
                    <View name="tribes" component={TribesContainer} />
                </ViewManager>
                <UI.Tabs.Navigator>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'notifications')} selected={selectedIsOneOf(['notifications'])}>
                        <Svg name="icon_notifications" />
                        <UI.Tabs.Label>Notifications</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'chats')} selected={selectedIsOneOf(['chats'])}>
                        <Svg name="icon_message" />
                        {!!unreadChatMessagesCount &&
                            <span className="Tabs-Alert">{unreadChatMessagesCount}</span>
                        }
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
};

TabsViewManager.lastSelectedTab = 'notifications';

export default TabsViewManager;
