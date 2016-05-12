'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import c from 'classnames';
import { get } from 'mout/object';
import { createApp, View, ViewManager } from '/imports/touchstonejs/lib';

import TouchstoneApp from '/imports/TouchstoneApp';
import LoginContainer from '/imports/views/root/LoginContainer';
import LoginFlowViewManager from '/imports/views/root/LoginFlowViewManager';
import AppContainer from '/imports/views/root/AppContainer';
import AboutModalViewManager from '/imports/views/root/AboutModalViewManager';

const app = createApp();
TouchstoneApp.set(app.getChildContext().app);

const RootViewManager = class RootViewManager extends React.Component {
    constructor(props) {
        super(props);
        this.defaultView = this.props.userId ? 'app' : 'login';
    }

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
                    <ViewManager name="root" defaultView={this.defaultView}>
                        <View name="login" component={LoginContainer} />
                        <View name="login-flow" component={LoginFlowViewManager} />
                        <View name="app" component={AppContainer} />
                        <View name="about-modal" component={AboutModalViewManager} />
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
