'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';
import { find } from 'mout/array';

import Pagination from '/imports/classes/Pagination';
import formatWebsiteUrl from '/imports/services/formatWebsiteUrl';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import asyncDataContainer from '/imports/services/asyncDataContainer';
import PartupsView from './PartupsView';
import Debug from '/imports/Debug';
import { UserModel, ImageModel, PartupModel } from '/imports/models';

let partnerPagination,
    supporterPagination;

const getPartupsPromise = (url) => {
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

const myAsyncDataContainer = asyncDataContainer(PartupsView, {}, (props, cb, isMounting) => {
    const propsHaveChanged = () => {
        cb({
            partups: {
                byPartner: {
                    data: partnerPagination.getData(),
                    loading: partnerPagination.isLoading(),
                    endReached: partnerPagination.isEndReached(),
                    loadMore: () => {
                        partnerPagination.loadMore().then(propsHaveChanged);
                        propsHaveChanged();
                    }
                },
                bySupporter: {
                    data: supporterPagination.getData(),
                    loading: supporterPagination.isLoading(),
                    endReached: supporterPagination.isEndReached(),
                    loadMore: () => {
                        supporterPagination.loadMore().then(propsHaveChanged);
                        propsHaveChanged();
                    }
                }
            }
        });
    };

    const baseUrl = formatWebsiteUrl({pathname: `/users/${props.loggedInUser._id}`});
    const getQueryString = (skip, limit) => encodeQueryString({
        userId: props.loggedInUser._id,
        token: props.storedLoginToken,
        archived: false,
        skip, limit
    });

    if (isMounting) {

        // Explicitly give data from previous time
        if (partnerPagination || supporterPagination) {
            propsHaveChanged();
        }

        partnerPagination = new Pagination({start: 15, increase: 10}, (skip, limit) => {
            return getPartupsPromise(`${baseUrl}/upperpartups/${getQueryString(skip, limit)}`)
                .then((partups) => partups);
        });

        supporterPagination = new Pagination({start: 15, increase: 10}, (skip, limit) => {
            return getPartupsPromise(`${baseUrl}/supporterpartups/${getQueryString(skip, limit)}`)
                .then((partups) => partups);
        });

        partnerPagination.loadFirst()
            .then(propsHaveChanged);

        supporterPagination.loadFirst()
            .then(propsHaveChanged);
    }
});

export default meteorDataContainer(myAsyncDataContainer, (props) => {
    const {} = props;
    Debug.tracker('PartupsContainer');

    const accounts = UserModel.accountsClient;
    const loggedInUser = accounts.user();
    const storedLoginToken = accounts._storedLoginToken();

    return {
        loggedInUser,
        storedLoginToken
    };
});
