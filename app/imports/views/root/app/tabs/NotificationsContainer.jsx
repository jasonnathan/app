'use strict';

import { Meteor } from 'meteor/meteor';
import { toLookup } from 'mout/array';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import Subs from '/imports/Subs';
import NotificationsView from './NotificationsView';
import Connection from '/imports/Connection';
import { NotificationModel } from '/imports/models';
import Debug from '/imports/Debug';

let notificationsPagination;

export default meteorDataContainer(NotificationsView, (props) => {
    const {} = props;
    Debug.tracker('NotificationsContainer');

    Subs.subscribe('notifications.for_upper', 35);

    const notifications = NotificationModel.query()
        .search(m => m.searchForUser(Meteor.userId()))
        .fetch();

    const onAllNotificationsRead = () => {
        Connection.call('notifications.all_read');
    };

    const onNotificationClicked = (id) => {
        Connection.call('notifications.clicked', id);
    };

    return {
        notifications,
        onAllNotificationsRead,
        onNotificationClicked
    };
});
