'use strict';

import React from 'react';

import NotificationModel from '/imports/models/NotificationModel';
import Content from '/imports/components/Content';

export default class NotificationsView extends React.Component {
    render() {
        return (
            <Content>
                {this.props.notifications.map((notification, index) => (
                    <Content.Text key={index}>
                        {notification.type}
                    </Content.Text>
                ))}
            </Content>
        );
    }
};

NotificationsView.propTypes = {
    notifications: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NotificationModel)).isRequired
};

NotificationsView.navigationBar = 'tabs';
NotificationsView.getNavigation = () => {
    return {
        title: 'Notifications'
    };
};
