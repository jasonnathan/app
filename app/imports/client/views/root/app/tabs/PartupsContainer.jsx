'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';
import { find } from 'mout/array';

import HttpPagination from '/imports/client/classes/HttpPagination';
import formatWebsiteUrl from '/imports/client/services/formatWebsiteUrl';
import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import asyncDataContainer from '/imports/client/services/asyncDataContainer';
import PartupsView from './PartupsView';
import Debug from '/imports/client/Debug';
import { UserModel, ImageModel, PartupModel } from '/imports/client/models';
import userCache from '/imports/client/services/userCache';

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
    let cache = userCache.get('partupsContainer');
    if (!cache) {
        cache = {};
        userCache.set('partupsContainer', cache);
    }

    if (isMounting) {
        cache.shouldInitialise = true;
        userCache.set('partupsContainer', cache);
    }

    const propsHaveChanged = () => {
        cb({
            partups: {
                byPartner: {
                    data: cache.partnerPagination.getData(),
                    loading: cache.partnerPagination.isLoading(),
                    endReached: cache.partnerPagination.isEndReached(),
                    loadMore: () => {
                        const promise = cache.partnerPagination.loadMore();
                        if (promise) promise.then(propsHaveChanged);
                        propsHaveChanged();
                    }
                },
                bySupporter: {
                    data: cache.supporterPagination.getData(),
                    loading: cache.supporterPagination.isLoading(),
                    endReached: cache.supporterPagination.isEndReached(),
                    loadMore: () => {
                        const promise = cache.supporterPagination.loadMore();
                        if (promise) promise.then(propsHaveChanged);
                        propsHaveChanged();
                    }
                }
            }
        });
    };

    if (cache.shouldInitialise && props.loggedInUser && props.storedLoginToken) {
        cache.shouldInitialise = false;

        const baseUrl = formatWebsiteUrl({pathname: `/users/${props.loggedInUser._id}`});
        const getQueryString = (skip, limit) => encodeQueryString({
            userId: props.loggedInUser._id,
            token: props.storedLoginToken,
            archived: false,
            skip, limit
        });

        // Explicitly give data from previous time
        if (cache.partnerPagination && cache.supporterPagination) {
            propsHaveChanged();
        }

        cache.partnerPagination = new HttpPagination({start: 8, increase: 20}, (skip, limit) => {
            return getPartupsPromise(`${baseUrl}/upperpartups/${getQueryString(skip, limit)}`)
                .then((partups) => partups);
        });

        cache.supporterPagination = new HttpPagination({start: 8, increase: 20}, (skip, limit) => {
            return getPartupsPromise(`${baseUrl}/supporterpartups/${getQueryString(skip, limit)}`)
                .then((partups) => partups);
        });

        userCache.set('partupsContainer', cache);

        cache.partnerPagination.loadFirst()
            .then(propsHaveChanged);

        cache.supporterPagination.loadFirst()
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
