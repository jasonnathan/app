'use strict';

import React from 'react';

import transitionTo from '/imports/helpers/transitionTo';
import { Container } from 'touchstonejs';
import NotificationModel from '/imports/models/NotificationModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Notification from '/imports/components/Notification';

const NotificationsView = class NotificationsView extends React.Component {
    componentWillUnmount() {
        this.props.onAllNotificationsRead();
    }

    render() {
        return (
            <Container scrollable fill>
                <List notifications>
                    {this.props.notifications.map((notification, index) => {
                        const onNotificationClick = () => {
                            this.props.onNotificationClicked(notification._id);
                            transitionTo('app:notification', {
                                transition: 'show-from-right',
                                viewProps: {notification}
                            });
                        };

                        return (
                            <ListItem key={index}>
                                <Notification
                                    notification={notification}
                                    onClick={onNotificationClick} />
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        );
    }
};

NotificationsView.propTypes = {
    notifications: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NotificationModel)).isRequired,
    onAllNotificationsRead: React.PropTypes.func.isRequired,
    onNotificationClicked: React.PropTypes.func.isRequired
};

NotificationsView.navigationBar = 'tabs';
NotificationsView.getNavigation = () => {
    return {
        title: 'Notifications'
    };
};

export default NotificationsView;
