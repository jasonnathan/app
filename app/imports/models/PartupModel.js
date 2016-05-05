'use strict';

import { Meteor } from 'meteor/meteor';
import { find } from 'mout/array';
import { get } from 'mout/object';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';
import getWebsitePathFor from '/imports/services/getWebsitePathFor';
import formatWebsiteUrl from '/imports/services/formatWebsiteUrl';
import ImageModel from '/imports/models/ImageModel';

export default class PartupModel extends Model {

    /**
     * Get partup image
     *
     * @return {ImageModel}
     */
    getImage() {
        return ImageModel.findOne(this.image);
    }

    /**
     * Get website url for partup
     *
     * @returns {String}
     */
    getWebsiteUrl() {
        const pathname = getWebsitePathFor('partup', {slug: this.slug});
        return formatWebsiteUrl({pathname});
    }

    /**
     * Get new updates count
     *
     * @returns {Number}
     */
    getNewUpdatesCount() {
        if (!this.upper_data) {
            return 0;
        }

        const upperData = find(this.upper_data, (d) => d._id === Meteor.userId()) || {};
        return get(upperData, 'new_updates.length') || 0;
    }
}

linkCollection(PartupModel, 'partups');
