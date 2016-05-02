'use strict';

import { Meteor } from 'meteor/meteor';
import { get } from 'mout/object';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import NotificationView from './NotificationView';
import Debug from '/imports/Debug';
import Connection from '/imports/Connection';
import NotificationModel from '/imports/models/NotificationModel';
import PartupUpdateModel from '/imports/models/PartupUpdateModel';

export default meteorDataContainer(NotificationView, (props) => {
    const {notificationId} = props;
    Debug.tracker('NotificationContainer');

    const notification = NotificationModel.findOne(notificationId);
    const coupledPartupUpdateId = notification.hasUpdate() && get(notification.type_data, 'update._id');

    let coupledPartupUpdate;
    if (coupledPartupUpdateId) {
        Connection.subscribe('updates.one', coupledPartupUpdateId);
        coupledPartupUpdate = PartupUpdateModel.findOne(coupledPartupUpdateId);
    }

    return {
        notification,
        coupledPartupUpdate
    };
});
