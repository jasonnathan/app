'use strict';

import { extend } from 'lodash';

export default class Model {
    constructor(doc) {
        extend(this, doc);
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
