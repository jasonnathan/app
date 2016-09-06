'use strict';

import { Meteor } from 'meteor/meteor';
import { get } from 'mout/object';

import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import NotificationView from './NotificationView';
import Debug from '/imports/client/Debug';
import Subs from '/imports/client/Subs';
import Connection from '/imports/client/Connection';
import { NotificationModel, ActivityModel, PartupUpdateModel, UserModel, PartupModel } from '/imports/client/models';

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
        Subs.subscribe('partups.one', partupUpdate.partup_id);

        partupUpdateData.activity = ActivityModel.query()
            .search(m => m.searchForPartupUpdate(partupUpdate))
            .findOne();

        partupUpdateData.user = UserModel.query()
            .search(partupUpdate.upper_id)
            .findOne();

        partupUpdateData.partup = PartupModel.query()
            .search(partupUpdate.partup_id)
            .findOne();
    }

    const onCommentSend = (comment) => {
        if (comment) {
            Connection.call('updates.comments.insert', partupUpdate._id, {
                content: comment
            });
        }
    };

    return {
        notification,
        partupUpdate,
        partupUpdateData,
        onCommentSend
    };
});
