'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import Subs from '/imports/client/Subs';
import AboutView from './AboutView';
import Debug from '/imports/client/Debug';
import { UserModel } from '/imports/client/models';

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
