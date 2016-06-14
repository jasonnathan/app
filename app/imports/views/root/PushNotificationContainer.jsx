'use strict';

import { Meteor } from 'meteor/meteor';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import PushNotificationView from './PushNotificationView';
import Debug from '/imports/Debug';
import '/imports/Connection';
import transitionTo from '/imports/services/transitionTo';
import Subs from '/imports/Subs';
import openWeb from '/imports/services/openWeb';
import { NotificationModel } from '/imports/models';
import Connection from '/imports/Connection';

export default meteorDataContainer(PushNotificationView, (props) => {
    const {payload} = props;
    Debug.tracker('PushNotificationContainer', payload);

    try {

        // Chat message
        if (payload.additionalData.chat) {
            const chat = payload.additionalData.chat;

            transitionTo('root:app:chat', {
                transition: 'instant',
                viewProps: {
                    chatId: chat._id,
                    chatUsername: chat.username
                }
            });
        }

        // Notification
        else if (payload.additionalData.notification) {
            const notification = payload.additionalData.notification;
            console.log('notification', notification);

            Subs.subscribe('notifications.for_upper.by_id', notification._id, {
                onReady: () => {
                    const _notification = NotificationModel.findOne(notification._id);
                    console.log('_notification', _notification);

                    if (!_notification) {
                        throw 'Notification not found';
                    }

                    Connection.call('notifications.clicked', _notification._id);

                    if (_notification.hasUpdate()) {
                        console.log('transitionTo(`root:app:notification`)');
                        transitionTo('root:app:notification', {
                            transition: 'instant',
                            viewProps: {
                                notificationId: _notification._id
                            }
                        });
                    } else {
                        console.log('openWeb');
                        openWeb(_notification.getWebsiteUrl());
                    }
                }
            });
        }

        // Unable to determine type
        else {
            throw 'Unable to determine notification type';
        }

    } catch(err) {
        console.error(err);

        transitionTo('app:tabs:notifications', {
            transition: 'fade',
            viewProps: {}
        });
    }

    return {
        //
    };
});
