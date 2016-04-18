'use strict';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Connection from '../Connection';
import UserModel from '../models/UserModel';
import ProfileView from '../components/views/root/ProfileView';

export default createContainer((props) => {
    const {} = props;

    const loggedInUserHandle = Connection.subscribe('users.loggedin');
    const loggedInUserLoading = !loggedInUserHandle.ready();
    const loggedInUser = Meteor.user();

    return {
        loggedInUser,
        loggedInUserLoading
    };
}, ProfileView);
