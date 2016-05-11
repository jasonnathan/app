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
        return this.profile.image && ImageModel.findOne(this.profile.image);
    }

    /**
     * Get the user score
     *
     * @return {Number} rounded and bounded participation score
     */
    getScore() {
        var score = this.participation_score ? this.participation_score : 0;

        // For design purposes, we only want to display
        // a max value of 99 and a min value of 10,
        // every number should be a natural one
        score = Math.min(99, score);
        score = Math.max(10, score);
        score = Math.round(score);

        return score;
    }
}

linkCollection(UserModel, accountsClient.users);
