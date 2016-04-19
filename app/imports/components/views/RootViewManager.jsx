'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import c from 'classnames';
import { get } from 'mout/object';
import { createApp, View, ViewManager } from 'touchstonejs';

import App from '../../App';
import LoginContainer from './root/LoginContainer';
import LoginFlowViewManager from './root/LoginFlowViewManager';
import TabsViewManager from './root/TabsViewManager';
import ProfileContainer from './root/ProfileContainer';

const app = createApp();
App.set(app.getChildContext().app);

export default class RootViewManager extends React.Component {
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
                        <View name="tabs" component={TabsViewManager} />
                        <View name="profile" component={ProfileContainer} />
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
