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

const isDevelopment = Meteor.settings.public.environment === 'development';
const overrideDevServer = isDevelopment && localStorage.getItem('developmentServer');

const address = overrideDevServer || Meteor.settings.public.server;
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
