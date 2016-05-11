'use strict';

import Connection from '/imports/Connection';

export default {
    askPermission: () => {
        const {PushNotification, device} = window;

        if (!device) {
            return; // skip when non-mobile
        }

        if (!PushNotification) {
            throw new Error('PushNotification is not defined. Be sure to use it after the "deviceready" event has been emitted. Also, be sure to use it on mobile only.');
        }

        const push = PushNotification.init({
            android: {
                forceShow: true
            },
            ios: {

                // Quick way to automatically increase the badge for every notification
                badge: true,
                clearBadge: true
            }
        });

        push.on('registration', function(data) {
            Connection.call('users.register_pushnotifications_device', data.registrationId, device);
        });
    }
};
