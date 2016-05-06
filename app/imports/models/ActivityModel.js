'use strict';

import { check } from 'meteor/check';
import { get } from 'mout/object';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';
import PartupUpdateModel from '/imports/models/PartupUpdateModel';

export default class ActivityModel extends Model {
    /**
     * Search activity for update
     *
     * @param update {PartupUpdateModel}
     * @returns object
     */
    static searchForPartupUpdate(partupUpdate) {
        check(partupUpdate, PartupUpdateModel);

        return {
            selector: {
                _id: get(partupUpdate.type_data, 'activity_id')
            },
            options: {}
        };
    }
}

linkCollection(ActivityModel, 'activities');
