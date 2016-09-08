'use strict';

import Connection from '/imports/client/Connection';
import { get } from 'mout/object';
import transitionTo from '/imports/client/services/transitionTo';
import { UserModel } from 'part-up-js-models';

export default {
    askPermission: function() {
        const {PushNotification, device} = window;

        if (!device) {
            return; // skip when non-mobile
        }

        if (!PushNotification) {
            throw new Error('PushNotification is not defined. Be sure to use it after the "deviceready" event has been emitted. Also, be sure to use it on mobile only.');
        }

        const push = PushNotification.init({
            android: {
                senderID: "963161275015",
                forceShow: true
            },
            ios: {

                // Quick way to automatically increase the badge for every notification
                badge: true,
                clearBadge: true,
                sound: true,
                vibrate: true
            }
        });

        push.on('registration', (data) => {
            const loginToken = UserModel.accountsClient._storedLoginToken();
            Connection.call('users.register_pushnotifications_device', data.registrationId, device, loginToken, (AppVersion || {}).version || 'unknown');
        });

        push.on('notification', (data) => {
            if (!data.additionalData.foreground) {
                transitionTo('root:push-notification', {
                    transition: 'instant',
                    viewProps: {
                        payload: data
                    }
                });
            }
        });
    }
};
