'use strict';

import React from 'react';

import transitionTo from '/imports/services/transitionTo';
import { Container } from 'touchstonejs';
import NotificationModel from '/imports/models/NotificationModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Notification from '/imports/components/Notification';
import NavButton from '/imports/components/NavButton';

const NotificationsView = class NotificationsView extends React.Component {
    componentWillUnmount() {
        this.props.onAllNotificationsRead();
    }

    render() {
        return (
            <Container scrollable fill>
                <List notifications>
                    {this.props.notifications.map((notification, index) => {
                        return (
                            <ListItem key={index}>
                                <Notification
                                    notification={notification}
                                    onClick={() => this.onNotificationClick(notification)} />
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        );
    }

    onNotificationClick(notification) {
        this.props.onNotificationClicked(notification._id);

        if (notification.hasUpdate()) {
            transitionTo('app:notification', {
                transition: 'show-from-right',
                viewProps: {notificationId: notification._id}
            });
        } else {
            window.location = notification.getWebsiteUrl();
        }
    }
};

NotificationsView.propTypes = {
    notifications: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NotificationModel)).isRequired,
    onAllNotificationsRead: React.PropTypes.func.isRequired,
    onNotificationClicked: React.PropTypes.func.isRequired
};

NotificationsView.navigationBar = 'app';
NotificationsView.getNavigation = (props, app) => {
    return {
        rightLabel: <NavButton right icon="icon_info" />,
        rightAction: () => {
            app.transitionTo('root:about-modal', {
                transition: 'show-from-bottom'
            });
        },
        title: 'Notifications'
    };
};

export default NotificationsView;
