'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import LoginWithEmailView from './LoginWithEmailView';

export default meteorDataContainer(LoginWithEmailView, (props) => {
    const {} = props;

    const onLoginWithPassword = (email, password, callback) => {
        Meteor.loginWithPassword(email, password, callback);
    };

    return {
        onLoginWithPassword
    };
});
