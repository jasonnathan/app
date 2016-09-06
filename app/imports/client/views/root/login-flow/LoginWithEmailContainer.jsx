'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import LoginWithEmailView from './LoginWithEmailView';
import Debug from '/imports/client/Debug';

export default meteorDataContainer(LoginWithEmailView, (props) => {
    const {} = props;
    Debug.tracker('LoginWithEmailContainer');

    const onLoginWithPassword = (email, password, callback) => {
        Meteor.loginWithPassword(email, password, callback);
    };

    return {
        onLoginWithPassword
    };
});
