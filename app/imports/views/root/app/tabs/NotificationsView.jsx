'use strict';

import React from 'react';

import openWeb from '/imports/services/openWeb';
import pushNotifications from '/imports/services/pushNotifications';
import transitionTo from '/imports/services/transitionTo';
import NavButton from '/imports/components/NavButton';
import { Container } from '/imports/touchstonejs/lib';
import NotificationModel from '/imports/models/NotificationModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Notification from '/imports/components/Notification';
import EmptyState from '/imports/components/EmptyState';

const NotificationsView = class NotificationsView extends React.Component {
    componentDidMount() {
        pushNotifications.askPermission();
    }

    componentWillUnmount() {
        this.props.onAllNotificationsRead();
    }

    render() {
        let {notifications: n} = this.props;

        return (
            <Container scrollable fill>
                {!n || !n.length &&
                    <EmptyState type="notifications" />
                }
                <List notifications>
                    {n.map((notification, index) => {
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
            openWeb(notification.getWebsiteUrl());
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
        title: 'Notifications',
        rightLabel: <NavButton right icon="icon_info" />,
        rightAction: () => {
            app.transitionTo('root:about-modal', {
                transition: 'show-from-bottom'
            });
        }
    };
};

export default NotificationsView;
