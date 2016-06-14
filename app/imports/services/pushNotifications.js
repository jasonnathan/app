'use strict';

import Connection from '/imports/Connection';
import { get } from 'mout/object';
import transitionTo from '/imports/services/transitionTo';

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
                clearBadge: true
            }
        });

        push.on('registration', (data) => {
            Connection.call('users.register_pushnotifications_device', data.registrationId, device);
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
