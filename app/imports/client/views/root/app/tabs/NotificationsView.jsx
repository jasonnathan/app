'use strict';

import React from 'react';

import pushNotifications from '/imports/client/services/pushNotifications';
import transitionTo from '/imports/client/services/transitionTo';
import NavButton from '/imports/client/components/NavButton';
import { NotificationModel } from '/imports/client/models';
import List from '/imports/client/components/List';
import ListItem from '/imports/client/components/ListItem';
import Notification from '/imports/client/components/Notification';
import Flex from '/imports/client/components/Flex';
import EmptyState from '/imports/client/components/EmptyState';
import Spinner from '/imports/client/components/Spinner';

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
                                                onClick={() => this.props.onNotificationClick(notification)} />
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
};

NotificationsView.propTypes = {
    notifications: React.PropTypes.shape({
        data: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NotificationModel)).isRequired,
        loading: React.PropTypes.bool.isRequired,
        endReached: React.PropTypes.bool.isRequired,
        loadMore: React.PropTypes.func.isRequired
    }),
    onAllNotificationsRead: React.PropTypes.func.isRequired,
    onNotificationClick: React.PropTypes.func.isRequired
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
