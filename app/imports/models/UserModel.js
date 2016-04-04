'use strict';

import Model from '../classes/Model';
import linkCollection from '../helpers/linkCollection';

export default class UserModel extends Model {
    //
}

linkCollection(UserModel, 'users');
