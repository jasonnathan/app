'use strict';

import { find } from 'mout/array';

export default (documentsDest, addedDocuments) => {
    addedDocuments.forEach((doc) => {
        if (!find(documentsDest, _doc => _doc._id === doc._id)) {
            documentsDest.push(doc);
        }
    });
};
