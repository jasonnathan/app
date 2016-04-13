'use strict';

import { AccountsClient } from 'meteor/accounts-base';

import connection from '../Api';
import Model from '../classes/Model';
import linkCollection from '../helpers/linkCollection';

const accountsClient = new AccountsClient({connection});
Accounts.connection = connection;

export default class UserModel extends Model {

    /**
     * Get the accountsClient instance
     *
     * @return {AccountsClient}
     */
    static getAccountsClient() {
        return accountsClient;
    }

    /**
     * Get the first name of a user
     *
     * @return {String}
     */
    getFirstname() {
        return this.profile.firstname || this.profile.name.split(' ').shift();
    }
}

linkCollection(UserModel, accountsClient.users);
