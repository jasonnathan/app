'use strict';

import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp-client';
import { check, Match } from 'meteor/check';
import { get } from 'mout/object';
import { Tracker } from 'meteor/tracker';

import Debug from './Debug';

check(get(Meteor.settings || {}, 'public'), {
    server: String,
    environment: Match.Optional(String)
});

let address = Meteor.settings.public.server;

/**
 * Request server's local ip through a Meteor method.
 * Save it in localStorage and trigger a page reload,
 * because we need the ip here synchronously to replace 'localhost' with it.
 */
if (Meteor.settings.public.environment === 'development') {
    const ip = localStorage.getItem('ip');

    if (!ip) {
        Meteor.call('ip', (err, ip) => {
            if (err) {
                Debug.conn('Could not retrieve ip-address', err);
                return;
            }

            localStorage.setItem('ip', ip);
            location.reload();
        });
    } else {
        address = Meteor.settings.public.server.replace('localhost', ip);
    }

} else {

    /**
     * Disconnect from the server since we're using a custom DDP connection.
     */
    Meteor.disconnect();

}

const connection = DDP.connect(address);
Debug.conn(`Server configured as ${address}`);

const messages = {
    connecting: `Connecting to server`,
    connected: `Connected to server`,
    failed: `Failed to connect to server`,
    waiting: `Failed to connect and waiting to try to reconnect to server`,
};

Tracker.autorun(() => {
    const message = messages[connection.status().status];
    Debug.conn(message);
});

export default connection;
