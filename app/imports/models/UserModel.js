'use strict';

import Model from '../classes/Model';
import linkCollection from '../helpers/linkCollection';

export default class UserModel extends Model {

    /**
     * Get the first name of a user
     *
     * @return {String}
     */
    getFirstname() {
        return this.profile.firstname || this.profile.name.split(' ').shift();
    }
}

linkCollection(UserModel, 'users');
