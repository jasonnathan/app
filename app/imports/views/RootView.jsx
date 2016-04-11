'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import c from 'classnames';
import { get } from 'mout/object';
import { createApp, View, ViewManager } from 'touchstonejs';

import App from '../App';
import LoginFlowView from './root/LoginFlowView';
import TabsView from './root/TabsView';
import Logo from '../components/Logo';

const app = createApp();
App.set(app.getChildContext().app);

export default class RootView extends React.Component {
    componentDidMount() {
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    }

    render() {
        return (
            <div className={c(`app-wrapper device--${get(window, 'device.platform')}`)}>
                <div className="device-silhouette">
                    <ViewManager name="root" defaultView="login-flow">
                        <View name="login-flow" component={LoginFlowView} />
                        <View name="tabs" component={TabsView} />
                    </ViewManager>
                </div>
            </div>
        );
    }
};

RootView.childContextTypes = {
    app: React.PropTypes.object
};

ReactMixin(RootView.prototype, app);
