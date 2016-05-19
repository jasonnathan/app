'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';
import { find } from 'mout/array';

import formatWebsiteUrl from '/imports/services/formatWebsiteUrl';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import asyncDataContainer from '/imports/services/asyncDataContainer';
import PartupsView from './PartupsView';
import Debug from '/imports/Debug';
import { UserModel, ImageModel, PartupModel } from '/imports/models';

let cachedData;

const myAsyncDataContainer = asyncDataContainer(PartupsView, {}, (props, cb) => {
    if (cachedData) {
        cb(cachedData);
    }

    const createPartupsPromise = (url) => {
        return new Promise((resolve, reject) => {
            HTTP.get(url, function(error, response) {
                if (error) {
                    reject(error);
                    return;
                }

                const {partups, 'cfs.images.filerecord': images} = response.data;

                resolve((partups || []).map((partup) => {

                    // Overwrite getImage proto-function
                    partup.getImage = () => {
                        const image = find(images, (i) => i._id === partup.image);
                        return new ImageModel(image);
                    };

                    return new PartupModel(partup);
                }));
            });
        });
    };

    const baseUrl = formatWebsiteUrl({pathname: `/users/${props.loggedInUser._id}`});
    const queryString = encodeQueryString({
        userId: props.loggedInUser._id,
        token: props.storedLoginToken,
        archived: false
    });

    Promise.all([
        createPartupsPromise(`${baseUrl}/supporterpartups/${queryString}`),
        createPartupsPromise(`${baseUrl}/upperpartups/${queryString}`)
    ])
    .then((results) => {
        const data = {
            supporterPartups: results[0],
            partnerPartups: results[1]
        };

        cb(data);
        cachedData = data;
    });
});

export default meteorDataContainer(myAsyncDataContainer, (props) => {
    const {} = props;
    Debug.tracker('PartupsContainer');

    const accounts = UserModel.accountsClient;
    const loggedInUser = accounts.user();
    const storedLoginToken = accounts._storedLoginToken();

    return {
        loggedInUser,
        storedLoginToken,
        supporterPartups: [],
        partnerPartups: []
    };
});
