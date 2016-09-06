'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import transitionTo from '/imports/client/services/transitionTo';
import LoginView from '/imports/client/views/root/LoginView';
import { UserModel } from '/imports/client/models';
import userCache from '/imports/client/services/userCache';
import Debug from '/imports/client/Debug';

export default meteorDataContainer(LoginView, (props) => {
    const {} = props;
    Debug.tracker('LoginContainer');

    if (UserModel.accountsClient.userId()) {
        transitionTo('root:app', {
            transition: 'show-from-right'
        });
    } else {
        userCache.clearAll();
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
