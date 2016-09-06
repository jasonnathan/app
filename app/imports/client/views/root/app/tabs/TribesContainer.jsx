'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';
import { find } from 'mout/array';

import HttpPagination from '/imports/client/classes/HttpPagination';
import formatWebsiteUrl from '/imports/client/services/formatWebsiteUrl';
import asyncDataContainer from '/imports/client/services/asyncDataContainer';
import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import TribesView from './TribesView';
import Debug from '/imports/client/Debug';
import { UserModel, ImageModel, NetworkModel } from '/imports/client/models';
import userCache from '/imports/client/services/userCache';

const myAsyncDataContainer = asyncDataContainer(TribesView, {}, (props, cb, isMounting) => {
    let cache = userCache.get('tribesContainer');
    if (!cache) {
        cache = {};
        userCache.set('tribesContainer', cache);
    }

    if (isMounting) {
        cache.shouldInitialise = true;
        userCache.set('tribesContainer', cache);
    }

    const propsHaveChanged = () => {
        cb({
            networks: {
                data: cache.tribesPagination.getData(),
                loading: cache.tribesPagination.isLoading(),
                endReached: cache.tribesPagination.isEndReached(),
                loadMore: () => {
                    cache.tribesPagination.loadMore().then(propsHaveChanged);
                    propsHaveChanged();
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
            skip, limit
        });

        // Explicitly give data from previous time
        if (cache.tribesPagination) {
            propsHaveChanged();
        }

        cache.tribesPagination = new HttpPagination({start: 10, increase: 10}, (skip, limit) => {
            return new Promise((resolve, reject) => {
                HTTP.get(`${baseUrl}/networks/${getQueryString(skip, limit)}`, function(error, response) {
                    if (error) {
                        reject(error);
                        return;
                    }

                    const {networks, 'cfs.images.filerecord': images} = response.data;

                    resolve((networks || []).map((network) => {

                        // Overwrite getImage proto-function
                        network.getImage = () => {
                            const image = find(images, (i) => i._id === network.image);
                            return new ImageModel(image);
                        };

                        return new NetworkModel(network);
                    }));
                });
            });
        });

        userCache.set('tribesContainer', cache);

        cache.tribesPagination.loadFirst()
            .then(propsHaveChanged);
    }
});

export default meteorDataContainer(myAsyncDataContainer, (props) => {
    const {} = props;
    Debug.tracker('TribesContainer');

    const accounts = UserModel.accountsClient;
    const loggedInUser = accounts.user();
    const storedLoginToken = accounts._storedLoginToken();

    return {
        loggedInUser,
        storedLoginToken
    };
});
