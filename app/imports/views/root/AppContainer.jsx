'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import Connection from '/imports/Connection';
import AppViewManager from '/imports/views/root/AppViewManager';
import transitionTo from '/imports/services/transitionTo';
import Debug from '/imports/Debug';

export default meteorDataContainer(AppViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    Connection.subscribe('users.loggedin');
    Connection.subscribe('notifications.for_upper', 20);

    // If user is not logged in, redirect to login screen
    if (!Meteor.userId()) {
        transitionTo('root:login', {
            transition: 'reveal-from-right'
        });
    }

    return {};
});
