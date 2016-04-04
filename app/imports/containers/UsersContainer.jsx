'use strict';

import { createContainer } from 'meteor/react-meteor-data';
import Api from '../Api';
import UserModel from '../models/UserModel';
import Users from '../components/Users';

export default createContainer((props) => {
    const {} = props;

    const usersHandle = Api.subscribe('users.one', 'SY58rHRSbwYYssjTB');
    const usersLoading = !usersHandle.ready();
    const users = UserModel.query()
        .search({})
        .findAndFetch();

    return {
        users,
        usersLoading
    };
}, Users);
