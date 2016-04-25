'use strict';

import React from 'react';

import transitionTo from '/imports/helpers/transitionTo';
import { Container } from 'touchstonejs';
import NotificationModel from '/imports/models/NotificationModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import NotificationTile from '/imports/components/NotificationTile';

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
                            transitionTo('app:notification', {
                                transition: 'show-from-right',
                                viewProps: {notification}
                            });
                        };

                        return (
                            <ListItem key={index}>
                                <NotificationTile
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
    notifications: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NotificationModel)).isRequired
};

NotificationsView.navigationBar = 'tabs';
NotificationsView.getNavigation = () => {
    return {
        title: 'Notifications'
    };
};

export default NotificationsView;
