'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import NotificationView from './NotificationView';
import Debug from '/imports/Debug';
import NotificationModel from '/imports/models/NotificationModel';

export default meteorDataContainer(NotificationView, (props) => {
    const {notificationId} = props;
    Debug.tracker('NotificationContainer');

    const notification = NotificationModel.findOne(notificationId);

    return {
        notification
    };
});
