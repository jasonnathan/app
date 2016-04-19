'use strict';

import os from 'os';

Meteor.methods({
    'ip': function() {
        'use strict';

        var address;
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function(ifname) {

            ifaces[ifname].forEach(function(iface) {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return;
                }

                if (!address) {
                    address = iface.address;
                }
            });
        });

        return address;
    }
});
