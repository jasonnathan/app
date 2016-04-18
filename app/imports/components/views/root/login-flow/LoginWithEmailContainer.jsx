'use strict';

import { Meteor } from 'meteor/meteor';
import meteorDataContainer from '../../../../helpers/meteorDataContainer';

import LoginWithEmailView from './LoginWithEmailView';

export default meteorDataContainer(LoginWithEmailView, (props) => {
    const {} = props;

    const onLoginWithPassword = (email, password, callback) => {
        Meteor.loginWithPassword(email, password, (err) => {
            callback(err);
        });
    };

    return {
        onLoginWithPassword
    };
});
