'use strict';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';
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
}

linkCollection(NetworkModel, 'networks');
