'use strict';

import { Meteor } from 'meteor/meteor';
import { toLookup } from 'mout/array';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import NotificationsView from './NotificationsView';
import Connection from '/imports/Connection';
import NotificationModel from '/imports/models/NotificationModel';
import Debug from '/imports/Debug';

export default meteorDataContainer(NotificationsView, (props) => {
    const {} = props;
    Debug.tracker('NotificationsContainer');

    const notifications = NotificationModel.query()
        .search(m => m.searchForCurrentUser())
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
