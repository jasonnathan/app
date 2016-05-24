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

const limit = new ReactiveVar(15);
const notificationsLoading = new ReactiveVar(false);
const notificationsEndReached = new ReactiveVar(false);
const INCREASE = 10;

export default meteorDataContainer(NotificationsView, (props) => {
    const {} = props;
    Debug.tracker('NotificationsContainer');

    const getNotifications = () =>
        NotificationModel.query()
            .search(m => m.searchForUser(Meteor.userId()))
            .search({}, {limit: limit.get()})
            .fetch();

    const notifications = getNotifications();

    const sub = Subs.subscribe('notifications.for_upper', limit.get(), {
        onReady: () => {
            console.log('set loading to false');
            if (notifications.length === getNotifications()) {
                notificationsEndReached.set(true);
            }
        }
    });

    const loadMoreNotifications = () => {
        limit.set(limit.get() + INCREASE);
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
            endReached: notificationsEndReached.get(),
            loadMore: loadMoreNotifications
        },
        onAllNotificationsRead,
        onNotificationClicked
    };
});
