'use strict';

import { Accounts } from 'meteor/accounts-base';

import connection from '../Api';
import Model from '../classes/Model';
import linkCollection from '../helpers/linkCollection';

Accounts.connection = connection;

export default class UserModel extends Model {

    /**
     * Get the accountsClient instance
     *
     * @return {AccountsClient}
     */
    // static getAccountsClient() {
    //     return accountsClient;
    // }

    /**
     * Get the first name of a user
     *
     * @return {String}
     */
    getFirstname() {
        return this.profile.firstname || this.profile.name.split(' ').shift();
    }
}

linkCollection(UserModel, Accounts.users);
