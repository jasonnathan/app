'use strict';

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { toLookup } from 'mout/array';
import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import Connection from '/imports/client/Connection';
import Subs from '/imports/client/Subs';
import NotificationsView from './NotificationsView';
import { NotificationModel } from '/imports/client/models';
import Debug from '/imports/client/Debug';
import userCache from '/imports/client/services/userCache';
import transitionTo from '/imports/client/services/transitionTo';
import openWeb from '/imports/client/services/openWeb';

const START = 15;
const INCREASE = 10;

export default meteorDataContainer(NotificationsView, (props) => {
    const {} = props;
    Debug.tracker('NotificationsContainer');

    let cache = userCache.get('notificationsPage');
    if (!cache) {
        cache = {
            limit: new ReactiveVar(START),
            endReached: new ReactiveVar(false)
        };

        userCache.set('notificationsPage', cache);
    }

    const getNotifications = () =>
        NotificationModel.query()
            .search(m => m.searchForUser(Meteor.userId()))
            .search({}, {limit: cache.limit.get()})
            .fetch();

    const notifications = getNotifications();

    const sub = Subs.subscribe('notifications.for_upper', cache.limit.get(), {
        onReady: () => {
            if (notifications.length === getNotifications().length) {
                cache.endReached.set(true);
            }
        }
    });

    const loadMoreNotifications = () => {
        cache.limit.set(cache.limit.get() + INCREASE);
    };

    const onAllNotificationsRead = () => {
        Connection.call('notifications.all_read');
    };

    const onNotificationClick = (notification) => {
        Connection.call('notifications.clicked', notification._id);

        if (notification.hasUpdate() && notification.type !== 'partups_multiple_updates_since_visit') {
            transitionTo('app:notification', {
                transition: 'show-from-right',
                viewProps: {notificationId: notification._id}
            });
        } else {
            openWeb(notification.getWebsiteUrl());
        }
    };

    return {
        notifications: {
            data: notifications,
            loading: !sub.ready(),
            endReached: cache.endReached.get(),
            loadMore: loadMoreNotifications
        },
        onAllNotificationsRead,
        onNotificationClick
    };
});
