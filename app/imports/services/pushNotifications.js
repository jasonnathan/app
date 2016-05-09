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
            android: {},
            ios: {}
        });
    }
};
