'use strict';

import React from 'react';

import openWeb from '/imports/services/openWeb';
import pushNotifications from '/imports/services/pushNotifications';
import transitionTo from '/imports/services/transitionTo';
import NavButton from '/imports/components/NavButton';
import { NotificationModel } from '/imports/models';
import List from '/imports/components/List';
import ListItem from '/imports/components/ListItem';
import Notification from '/imports/components/Notification';
import Flex from '/imports/components/Flex';
import EmptyState from '/imports/components/EmptyState';
import Spinner from '/imports/components/Spinner';

const NotificationsView = class NotificationsView extends React.Component {
    componentDidMount() {
        pushNotifications.askPermission();
    }

    componentWillUnmount() {
        this.props.onAllNotificationsRead();
    }

    render() {
        const notificationsProps = this.props.notifications;
        const {data: notifications, loading, loadMore, endReached} = notificationsProps || {};

        return (
            <Flex>
                {notificationsProps &&
                    <Flex.Stretch scroll onHitBottom={() => !loading && !endReached && loadMore()}>
                        {(!notifications || !notifications.length) &&
                            <EmptyState type="notifications" />
                        }

                        <List notifications>
                            {notifications.map((notification, index) => {
                                return (
                                    <ListItem key={index}>
                                        {notification &&
                                            <Notification
                                                notification={notification}
                                                onClick={() => this.onNotificationClick(notification)} />
                                        }
                                    </ListItem>
                                );
                            })}
                        </List>

                        {loading &&
                            <Spinner infiniteScroll />
                        }
                    </Flex.Stretch>
                }
            </Flex>
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
    notifications: React.PropTypes.shape({
        data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NotificationModel)).isRequired,
        loading: React.PropTypes.bool.isRequired,
        endReached: React.PropTypes.bool.isRequired,
        loadMore: React.PropTypes.func.isRequired
    }),
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
