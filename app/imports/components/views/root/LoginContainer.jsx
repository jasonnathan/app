'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import meteorDataContainer from '../../../helpers/meteorDataContainer';

import App from '../../../App';
import transitionTo from '../../../helpers/transitionTo';
import LoginView from './LoginView';

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