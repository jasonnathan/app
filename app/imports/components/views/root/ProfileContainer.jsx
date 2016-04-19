'use strict';

import { Meteor } from 'meteor/meteor';
import meteorDataContainer from '../../../helpers/meteorDataContainer';

import ProfileView from './ProfileView';
import Connection from '../../../Connection';
import UserModel from '../../../models/UserModel';

export default meteorDataContainer(ProfileView, (props) => {
    const {} = props;

    const loggedInUserHandle = Connection.subscribe('users.loggedin');
    const loggedInUserLoading = !loggedInUserHandle.ready();
    const loggedInUser = UserModel.getAccounts().user();

    return {
        loggedInUser,
        loggedInUserLoading
    };
});
