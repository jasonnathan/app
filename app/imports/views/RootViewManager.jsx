'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import c from 'classnames';
import { get } from 'mout/object';
import { createApp, View, ViewManager } from 'touchstonejs';

import TouchstoneApp from '/imports/TouchstoneApp';
import LoginContainer from '/imports/views/root/LoginContainer';
import LoginFlowViewManager from '/imports/views/root/LoginFlowViewManager';
import AppContainer from '/imports/views/root/AppContainer';

const app = createApp();
TouchstoneApp.set(app.getChildContext().app);

const RootViewManager = class RootViewManager extends React.Component {
    componentDidMount() {
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }

        if (window.Keyboard && window.Keyboard.shrinkView) {
            window.Keyboard.shrinkView(true);
        }
    }

    render() {
        return (
            <div className={c(`app-wrapper device--${get(window, 'device.platform')}`)}>
                <div className="device-silhouette">
                    <ViewManager name="root" defaultView="login">
                        <View name="login" component={LoginContainer} />
                        <View name="login-flow" component={LoginFlowViewManager} />
                        <View name="app" component={AppContainer} />
                    </ViewManager>
                </div>
            </div>
        );
    }
};

RootViewManager.childContextTypes = {
    app: React.PropTypes.object
};

ReactMixin(RootViewManager.prototype, app);

export default RootViewManager;
