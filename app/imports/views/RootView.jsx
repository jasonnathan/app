'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import classNames from 'classnames';
import { get } from 'mout/object';
import { createApp, View, ViewManager } from 'touchstonejs';

import LoginFlowView from './root/LoginFlowView';
import TabsView from './root/TabsView';

export default class RootView extends React.Component {
    componentDidMount() {
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    }

    render() {
        const appWrapperClassName = classNames(`app-wrapper device--${get(window, 'device.platform')}`);

        return (
            <div className={appWrapperClassName}>
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

ReactMixin(RootView.prototype, createApp());
