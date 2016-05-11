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
import UserModel from '/imports/models/UserModel';
import ImageModel from '/imports/models/ImageModel';
import NetworkModel from '/imports/models/NetworkModel';

const myAsyncDataContainer = asyncDataContainer(TribesView, {}, (props, cb) => {
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

        cb({
            networks: mappedNetworks
        });
    });
});

export default meteorDataContainer(myAsyncDataContainer, (props) => {
    const {} = props;
    Debug.tracker('TribesContainer');

    const accounts = UserModel.getAccounts();
    const loggedInUser = accounts.user();
    const storedLoginToken = accounts._storedLoginToken();

    return {
        loggedInUser,
        storedLoginToken,
        networks: []
    };
});
