'use strict';

import Model from '/imports/classes/Model';
import linkCollection from '/imports/services/linkCollection';
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
}

linkCollection(PartupModel, 'partups');
