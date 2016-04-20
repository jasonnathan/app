'use strict';

import React from 'react';
import { Link } from 'touchstonejs';

import NotificationModel from '/imports/models/NotificationModel';
import Content from '/imports/components/Content';

export default class NotificationsView extends React.Component {
    render() {
        return (
            <Content>
                {this.props.notifications.map((notification, index) => (
                    <Content.Text key={index}>
                        <Link to="app:notification" transition="show-from-right" viewProps={{notification}}>
                            Notification {notification._id}
                        </Link>
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
