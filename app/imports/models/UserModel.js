'use strict';

import { AccountsClient, Accounts } from 'meteor/accounts-base';

import Connection from '../Connection';
import Model from '../classes/Model';
import linkCollection from '../helpers/linkCollection';

Accounts.connection = Meteor.connection = Connection;
const accountsClient = new AccountsClient({
    connection: Connection
});

export default class UserModel extends Model {

    /**
     * Get reference to the instance of accountsClient
     *
     * @return {AccountsClient}
     */
    static getAccounts() {
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
