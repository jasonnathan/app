'use strict';

import { Meteor } from 'meteor/meteor';
import { DDP } from 'meteor/ddp-client';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { get } from 'mout/object';
import Debug from './Debug';

check(get(Meteor.settings || {}, 'public.server'), String);

const address = `${Meteor.settings.public.server}`;
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
