'use strict';

import React from 'react';
import { Container, UI, View, ViewManager } from 'touchstonejs';

let lastSelectedTab = 'lists';
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

        this.setState({
            selectedTab: value
        });
    }

    render() {
        let selectedTab = this.state.selectedTab;
        let selectedTabSpan = selectedTab;

        if (selectedTab === 'lists' || selectedTab === 'list-details') {
            selectedTabSpan = 'lists';
        }

        if (selectedTab === 'transitions' || selectedTab === 'transitions-target') {
            selectedTabSpan = 'transitions';
        }

        return (
            <Container>
                <UI.NavigationBar name="tabs" />
                <ViewManager ref="vm" name="tabs" defaultView={selectedTab} onViewChange={this.onViewChange.bind(this)}>
                    <View name="lists" component={require('./tabs/lists')} />
                    <View name="form" component={require('./tabs/form')} />
                    <View name="controls" component={require('./tabs/controls')} />
                    <View name="transitions" component={require('./tabs/transitions')} />
                </ViewManager>
                <UI.Tabs.Navigator>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'lists')} selected={selectedTabSpan === 'lists'}>
                        <span className="Tabs-Icon Tabs-Icon--lists" />
                        <UI.Tabs.Label>Lists</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'form')} selected={selectedTabSpan === 'form'}>
                        <span className="Tabs-Icon Tabs-Icon--forms" />
                        <UI.Tabs.Label>Forms</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'controls')} selected={selectedTabSpan === 'controls'}>
                        <span className="Tabs-Icon Tabs-Icon--controls" />
                        <UI.Tabs.Label>Controls</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                    <UI.Tabs.Tab onTap={this.selectTab.bind(this, 'transitions')} selected={selectedTabSpan === 'transitions'}>
                        <span className="Tabs-Icon Tabs-Icon--transitions" />
                        <UI.Tabs.Label>Transitions</UI.Tabs.Label>
                    </UI.Tabs.Tab>
                </UI.Tabs.Navigator>
            </Container>
        );
    }
}
