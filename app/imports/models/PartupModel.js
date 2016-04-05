'use strict';

import Model from '../classes/Model';
import linkCollection from '../helpers/linkCollection';

/**
 * @class PartupModel
 */
export default class PartupModel extends Model {

    /**
     * Search: all partups sorted by createdAt
     *
     * @return {Object}
     */
    static searchAllPartups() {
        return {
            selector: {},
            options: {
                sort: {
                    created_at: -1
                }
            }
        };
    }
}

linkCollection(PartupModel, 'partups');
