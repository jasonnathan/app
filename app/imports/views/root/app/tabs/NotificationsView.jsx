'use strict';

import React from 'react';

import transitionTo from '/imports/helpers/transitionTo';
import NotificationModel from '/imports/models/NotificationModel';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import NotificationTile from '/imports/components/NotificationTile';

const NotificationsView = class NotificationsView extends React.Component {
    render() {
        return (
            <List notifications>
                {this.props.notifications.map((notification, index) => {
                    const onNotificationClick = () => {
                        alert(`click ${notification._id}`);
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
