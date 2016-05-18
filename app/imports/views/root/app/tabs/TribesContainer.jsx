'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';
import { find } from 'mout/array';

import formatWebsiteUrl from '/imports/services/formatWebsiteUrl';
import asyncDataContainer from '/imports/services/asyncDataContainer';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import TribesView from './TribesView';
import Debug from '/imports/Debug';
import { UserModel, ImageModel, PartupModel } from '/imports/models';

let cachedData;

const myAsyncDataContainer = asyncDataContainer(TribesView, {}, (props, cb) => {
    if (cachedData) {
        cb(cachedData);
    }

    const baseUrl = formatWebsiteUrl({pathname: `/users/${props.loggedInUser._id}`});
    const queryString = encodeQueryString({
        userId: props.loggedInUser._id,
        token: props.storedLoginToken
    });


    HTTP.get(`${baseUrl}/networks/${queryString}`, function(error, response) {
        if (error) {
            throw error;
            return;
        }

        const {networks, 'cfs.images.filerecord': images} = response.data;

        const mappedNetworks = (networks || []).map((network) => {

            // Overwrite getImage proto-function
            network.getImage = () => {
                const image = find(images, (i) => i._id === network.image);
                return new ImageModel(image);
            };

            return new NetworkModel(network);
        });

        const data = {
            networks: mappedNetworks
        };

        cb(data);
        cachedData = data;
    });
});

export default meteorDataContainer(myAsyncDataContainer, (props) => {
    const {} = props;
    Debug.tracker('TribesContainer');

    const loggedInUser = UserModel.accountsClient.user();
    const storedLoginToken = accounts._storedLoginToken();

    return {
        loggedInUser,
        storedLoginToken,
        networks: []
    };
});
