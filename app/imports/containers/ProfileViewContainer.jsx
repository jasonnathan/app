'use strict';

import { createContainer } from 'meteor/react-meteor-data';
import Api from '../Api';
import UserModel from '../models/UserModel';
import ProfileView from '../components/views/root/ProfileView';

export default createContainer((props) => {
    const {} = props;

    const loggedInUserHandle = Api.subscribe('users.loggedin');
    const loggedInUserLoading = !loggedInUserHandle.ready();
    const loggedInUser = Meteor.user();

    return {
        loggedInUser,
        loggedInUserLoading
    };
}, ProfileView);
