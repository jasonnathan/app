'use strict';

import { AccountsClient } from 'meteor/accounts-base';

import Connection from '/imports/Connection';
import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';
import ImageModel from '/imports/models/ImageModel';

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

    /**
     * Get the avatar image
     *
     * @return {ImageModel}
     */
    getAvatarImage() {
        return this.profile.avatar && ImageModel.findOne(this.profile.avatar);
    }
}

linkCollection(UserModel, accountsClient.users);
