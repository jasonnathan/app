'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import transitionTo from '/imports/services/transitionTo';
import LoginView from '/imports/views/root/LoginView';
import Debug from '/imports/Debug';

export default meteorDataContainer(LoginView, (props) => {
    const {} = props;
    Debug.tracker('LoginContainer');

    // fixme
    setTimeout(() => {
        // If user is already logged in, redirect to tabs screen
        if (Meteor.userId()) {
            transitionTo('root:app', {
                transition: 'show-from-right'
            });
        }
    }, 1500);

    const onLoginWithFacebook = (cb) => {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, cb);
    };

    const onLoginWithLinkedIn = (cb) => {
        Meteor.loginWithLinkedIn({
            requestPermissions: ['r_emailaddress']
        }, cb);
    };

    return {
        onLoginWithFacebook,
        onLoginWithLinkedIn
    };
});
