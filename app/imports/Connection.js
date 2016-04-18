'use strict';

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import Debug from './Debug';

const connection = Meteor.connection;

Tracker.autorun(() => {
    const status = connection.status();

    if (status) {
        Debug.conn(`Status changed to "${status.status}"`);
    }
});

// Todo: make custom DDP connection and make sure the Accounts package uses it.
export default connection;
