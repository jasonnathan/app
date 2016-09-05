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
import { get } from 'mout/object';

const fallback = () => {
    transitionTo('root:app:tabs:notifications', {
        transition: 'fade',
        viewProps: {}
    });
};

export default meteorDataContainer(PushNotificationView, (props) => {
    const {payload} = props;
    Debug.tracker('PushNotificationContainer', payload);

    try {
        const payloadString = get(payload, 'additionalData.payload');
        const parsedPayload = typeof payloadString === 'object' ? payloadString : JSON.parse(payloadString);

        // Chat message
        if (parsedPayload.chat) {
            const chat = parsedPayload.chat;

            transitionTo('root:app:chat', {
                transition: 'instant',
                viewProps: {
                    chatId: chat._id,
                    chatName: chat.name,
                    chatType: chat.type,
                    networkSlug: chat.networkSlug
                }
            });
        }

        // Notification
        else if (parsedPayload.notification) {
            const notification = parsedPayload.notification;

            Subs.subscribe('notifications.for_upper.by_id', notification._id, {
                onReady: () => {
                    try {
                        const _notification = NotificationModel.findOne(notification._id);

                        if (!_notification) {
                            throw 'Notification not found';
                        }

                        Connection.call('notifications.clicked', _notification._id);

                        if (_notification.hasUpdate()) {
                            transitionTo('root:app:notification', {
                                transition: 'instant',
                                viewProps: {
                                    notificationId: _notification._id
                                }
                            });
                        } else {
                            transitionTo('root:app:tabs:notifications', {
                                transition: 'fade',
                                viewProps: {}
                            });
                            openWeb(_notification.getWebsiteUrl());
                        }
                    } catch (err) {
                        console.error(err);
                        fallback();
                    }
                }
            });
        }

        // Unable to determine type
        else {
            throw 'Unable to determine notification type';
        }

    } catch (err) {
        console.error(err);
        fallback();
    }

    return {};
});
