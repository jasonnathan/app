'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';
import { find } from 'mout/array';

import Pagination from '/imports/classes/Pagination';
import formatWebsiteUrl from '/imports/services/formatWebsiteUrl';
import asyncDataContainer from '/imports/services/asyncDataContainer';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import TribesView from './TribesView';
import Debug from '/imports/Debug';
import { UserModel, ImageModel, NetworkModel } from '/imports/models';

let tribesPagination;

const myAsyncDataContainer = asyncDataContainer(TribesView, {}, (props, cb, isMounting) => {
    const propsHaveChanged = () => {
        cb({
            networks: {
                data: tribesPagination.getData(),
                loading: tribesPagination.isLoading(),
                endReached: tribesPagination.isEndReached(),
                loadMore: () => {
                    tribesPagination.loadMore().then(propsHaveChanged);
                    propsHaveChanged();
                }
            }
        });
    };

    const baseUrl = formatWebsiteUrl({pathname: `/users/${props.loggedInUser._id}`});
    const getQueryString = (skip, limit) => encodeQueryString({
        userId: props.loggedInUser._id,
        token: props.storedLoginToken,
        skip, limit
    });

    if (isMounting) {

        // Explicitly give data from previous time
        if (tribesPagination) {
            propsHaveChanged();
        }

        tribesPagination = new Pagination({start: 10, increase: 10}, (skip, limit) => {
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

        tribesPagination.loadFirst()
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
