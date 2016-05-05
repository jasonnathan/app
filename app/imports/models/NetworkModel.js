'use strict';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';
import getWebsitePathFor from '/imports/services/getWebsitePathFor';
import formatWebsiteUrl from '/imports/services/formatWebsiteUrl';
import ImageModel from '/imports/models/ImageModel';

export default class NetworkModel extends Model {

    /**
     * Get network image
     *
     * @return {ImageModel}
     */
    getImage() {
        return ImageModel.findOne(this.image);
    }

    /**
     * Get website url for network
     *
     * @returns {String}
     */
    getWebsiteUrl() {
        const pathname = getWebsitePathFor('network', {slug: this.slug});
        return formatWebsiteUrl({pathname});
    }
}

linkCollection(NetworkModel, 'networks');
