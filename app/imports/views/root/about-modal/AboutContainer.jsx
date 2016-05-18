'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import Subs from '/imports/Subs';
import AboutView from './AboutView';
import Debug from '/imports/Debug';
import { UserModel } from '/imports/models';

export default meteorDataContainer(AboutView, (props) => {
    const {} = props;
    Debug.tracker('AboutContainer');

    Subs.subscribe('users.loggedin');

    const loggedInUser = UserModel.accountsClient.user();
    const loggedInUserAvatar = loggedInUser && loggedInUser.getAvatarImage();

    const onLogout = function(callback) {
        Meteor.logout(callback);
    };

    return {
        onLogout,
        loggedInUser,
        loggedInUserAvatar
    };
});
