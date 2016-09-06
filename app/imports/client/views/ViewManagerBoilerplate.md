ViewManager boilerplate
-----------------------

A `ViewManager` has the responsibility over one or multiple `View`s.

*Filename:* `<Name>`ViewManager.jsx

*Contents:*

You may want to skip the NavigationBar--detail className

    'use strict';

    import React from 'react';
    import { Container, UI, View, ViewManager } from '/imports/client/touchstonejs/lib';

    import SomeContainer from './my-name/SomeContainer';
    import OtherContainer from './my-name/OtherContainer';
    import SomeViewManager from './my-name/SomeViewManager';

    export default class MyViewManager extends React.Component {
        render() {
            return (
                <Container>
                    {/* Any navigation bar */}
                    <ViewManager name="my-name" defaultView="some-view">
                        <View name="some-view" component={SomeContainer} />
                        <View name="other-view" component={OtherContainer} />
                        <View name="some-viewmanager" component={SomeViewManager} />
                    </ViewManager>
                    {/* Any tabs navigator */}
                </Container>
            );
        }
    }

*Example navigation bar:*

    <UI.NavigationBar name="my-name" />

*Example navigation bar (detail):*

    <UI.NavigationBar name="my-name" className="NavigationBar--detail" />

*Example tabs navigation bar:*

    <UI.Tabs.Navigator>
        <UI.Tabs.Tab onTap={fn} selected={true}>
            <span className="Tabs-Icon Tabs-Icon--my-icon" />
            <UI.Tabs.Label>One</UI.Tabs.Label>
        </UI.Tabs.Tab>
        <UI.Tabs.Tab onTap={fn} selected={false}>
            <span className="Tabs-Icon Tabs-Icon--my-icon" />
            <UI.Tabs.Label>Two</UI.Tabs.Label>
        </UI.Tabs.Tab>
        <UI.Tabs.Tab onTap={fn} selected={false}>
            <span className="Tabs-Icon Tabs-Icon--my-icon" />
            <UI.Tabs.Label>Three</UI.Tabs.Label>
        </UI.Tabs.Tab>
        <UI.Tabs.Tab onTap={fn} selected={false}>
            <span className="Tabs-Icon Tabs-Icon--my-icon" />
            <UI.Tabs.Label>Four</UI.Tabs.Label>
        </UI.Tabs.Tab>
    </UI.Tabs.Navigator>
