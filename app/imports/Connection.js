'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { DDP } from 'meteor/ddp-client';
import { check, Match } from 'meteor/check';
import { get } from 'mout/object';
import { Tracker } from 'meteor/tracker';

import Debug from '/imports/Debug';

check(get(Meteor.settings || {}, 'public'), {
    server: String,
    environment: Match.Optional(String)
});

let address = Meteor.settings.public.server;

/**
 * On development we'll want to replace 'localhost'
 * with your local ip to be able to connect to your
 * local part-up server from a mobile device.
 */
if (Meteor.settings.public.environment === 'development') {
    const storedIp = localStorage.getItem('ip');

    if (storedIp) {
        address = Meteor.settings.public.server.replace('localhost', storedIp);
    }

    Meteor.call('ip', (err, ip) => {
        if (ip && ip !== storedIp) {
            localStorage.setItem('ip', ip);
            location.reload();
        }
    });
}

const connection = DDP.connect(address);
Meteor.connection = Accounts.connection = connection;
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
