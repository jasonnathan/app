'use strict';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { get } from 'mout/object';
import { format as formatUrl } from 'url';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';

export default class ImageModel extends Model {

    /**
     * Get url for image
     *
     * @param {String} store
     */
    getUrl(store) {
        store = store || '1200x520';

        check(Meteor.settings.public.aws, Object);
        const {region, bucket} = Meteor.settings.public.aws;

        check(region, String);
        check(bucket, String);

        return formatUrl({
            protocol: `https`,
            hostname: `s3-${region}.amazonaws.com`,
            pathname: `/${bucket}/${store}/${this.copies[store].key}`
        });
    }
}

linkCollection(ImageModel, 'cfs.images.filerecord');
