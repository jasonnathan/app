'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import transitionTo from '/imports/helpers/transitionTo';
import LoginView from '/imports/views/root/LoginView';

export default meteorDataContainer(LoginView, (props) => {
    const {} = props;

    // If user is already logged in, redirect to profile screen
    if (Meteor.userId()) {
        transitionTo('root:profile', {
            transition: 'show-from-right'
        });
    }

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
