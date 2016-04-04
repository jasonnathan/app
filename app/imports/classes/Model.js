'use strict';

import _ from 'lodash';

export default class Model {
    constructor(doc) {
        _.extend(this, doc);
    }

    /**
     * Check equality between documents
     *
     * @param {Object} document
     */
    equals(doc) {
        return this._id === doc._id;
    }
}
