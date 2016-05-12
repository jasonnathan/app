'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import Subs from '/imports/Subs';
import AppViewManager from '/imports/views/root/AppViewManager';
import transitionTo from '/imports/services/transitionTo';
import Debug from '/imports/Debug';

export default meteorDataContainer(AppViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    Subs.subscribe('users.loggedin');
    Subs.subscribe('notifications.for_upper', 35);

    // fixme
    Meteor.userId();
    setTimeout(() => {
        // If user is not logged in, redirect to login screen
        if (!Meteor.userId()) {
            transitionTo('root:login', {
                transition: 'reveal-from-right'
            });
        }
    }, 1500);

    return {};
});
