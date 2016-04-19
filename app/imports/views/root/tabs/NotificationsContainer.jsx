'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import NotificationsView from './NotificationsView';
import Connection from '/imports/Connection';
import NotificationModel from '/imports/models/NotificationModel';
import Debug from '/imports/Debug';

export default meteorDataContainer(NotificationsView, (props) => {
    const {} = props;
    Debug.tracker('NotificationsContainer tracker run');

    const notificationsHandle = Connection.subscribe('notifications.for_upper', 2);
    const notificationsLoading = !notificationsHandle.ready();
    const notifications = NotificationModel.query()
        .search(m => m.searchForCurrentUser())
        .fetch();

    return {
        notifications,
        notificationsLoading
    };
});
