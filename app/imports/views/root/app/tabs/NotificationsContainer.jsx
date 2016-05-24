'use strict';

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { toLookup } from 'mout/array';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import Connection from '/imports/Connection';
import Subs from '/imports/Subs';
import NotificationsView from './NotificationsView';
import { NotificationModel } from '/imports/models';
import Debug from '/imports/Debug';
import userCache from '/imports/services/userCache';

const INCREASE = 10;

export default meteorDataContainer(NotificationsView, (props) => {
    const {} = props;
    Debug.tracker('NotificationsContainer');

    let cache = userCache.get('notificationsPage');
    if (!cache) {
        cache = {
            limit: new ReactiveVar(15),
            notificationsEndReached: new ReactiveVar(false)
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
            if (notifications.length === getNotifications()) {
                cache.notificationsEndReached.set(true);
            }
        }
    });

    const loadMoreNotifications = () => {
        cache.limit.set(cache.limit.get() + INCREASE);
    };

    const onAllNotificationsRead = () => {
        Connection.call('notifications.all_read');
    };

    const onNotificationClicked = (id) => {
        Connection.call('notifications.clicked', id);
    };

    return {
        notifications: {
            data: notifications,
            loading: !sub.ready(),
            endReached: cache.notificationsEndReached.get(),
            loadMore: loadMoreNotifications
        },
        onAllNotificationsRead,
        onNotificationClicked
    };
});
