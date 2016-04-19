'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import ProfileView from '/imports/views/root/ProfileView';
import Connection from '/imports/Connection';
import UserModel from '/imports/models/UserModel';
import transitionTo from '/imports/helpers/transitionTo';

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
