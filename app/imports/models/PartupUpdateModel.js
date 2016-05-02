'use strict';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';
import UserModel from '/imports/models/UserModel';

export default class PartupUpdateModel extends Model {
    static getUserForComment(comment) {
        return new UserModel({
            _id: comment.creator._id,
            profile: {
                name: comment.creator.name,
                avatar: comment.creator.image
            }
        });
    }
}

linkCollection(PartupUpdateModel, 'updates');