'use strict';

import { Meteor } from 'meteor/meteor';
import { get } from 'mout/object';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import NotificationView from './NotificationView';
import Debug from '/imports/Debug';
import Subs from '/imports/Subs';
import Connection from '/imports/Connection';
import NotificationModel from '/imports/models/NotificationModel';
import ActivityModel from '/imports/models/ActivityModel';
import PartupUpdateModel from '/imports/models/PartupUpdateModel';

export default meteorDataContainer(NotificationView, (props) => {
    const {notificationId} = props;
    Debug.tracker('NotificationContainer');

    const notification = NotificationModel.findOne(notificationId);
    const partupUpdateId = notification && notification.hasUpdate() && get(notification.type_data, 'update._id');

    let partupUpdate;
    if (partupUpdateId) {
        Subs.subscribe('updates.one', partupUpdateId);
        partupUpdate = PartupUpdateModel.findOne(partupUpdateId);
    }

    const partupUpdateData = {};
    if (partupUpdate) {
        partupUpdateData.activity = ActivityModel.query()
            .search(m => m.searchForPartupUpdate(partupUpdate))
            .findOne();
    }

    const onCommentSend = (comment) => {
        Connection.call('updates.comments.insert', partupUpdate._id, {
            content: comment
        });
    };

    return {
        notification,
        partupUpdate,
        partupUpdateData,
        onCommentSend
    };
});
