'use strict';

import { Mongo } from 'meteor/mongo';
import { Match, check } from 'meteor/check';
import { isString } from 'mout/lang';
import { extend } from 'lodash';

import QueryBuilder from '/imports/classes/QueryBuilder';
import Connection from '/imports/Connection';

export default (Model, collection) => {
    check(collection, Match.OneOf(
        Mongo.Collection,
        String
    ));

    let c = collection;

    // Create Mongo collection
    if (isString(collection)) {
        c = new Mongo.Collection(c, {
            connection: Connection
        });
    }

    // Transform document to extend opts.Document
    c._transform = (doc) => new Model(doc);

    // Define query builder
    c.query = () => new QueryBuilder(Model);

    // Extend model with the collection
    extend(Model, c);
};
