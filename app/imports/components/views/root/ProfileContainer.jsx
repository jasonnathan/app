'use strict';

import { Meteor } from 'meteor/meteor';
import meteorDataContainer from '../../../helpers/meteorDataContainer';

import App from '../../../App';
import ProfileView from './ProfileView';
import Connection from '../../../Connection';
import UserModel from '../../../models/UserModel';
import transitionTo from '../../../helpers/transitionTo';

export default meteorDataContainer(ProfileView, (props) => {
    const {} = props;

    const loggedInUserHandle = Connection.subscribe('users.loggedin');
    const loggedInUserLoading = !loggedInUserHandle.ready();
    const loggedInUser = UserModel.getAccounts().user();

    const onLogout = function(callback) {
        Meteor.logout(callback);
    };

    // If user is not logged in, redirect to login screen
    if (!Meteor.userId()) {
        transitionTo('root:login', {
            transition: 'reveal-from-right'
        });
    }

    return {
        loggedInUser,
        loggedInUserLoading,
        onLogout
    };
});
