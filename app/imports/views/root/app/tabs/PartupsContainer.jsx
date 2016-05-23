'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';
import { find } from 'mout/array';

import formatWebsiteUrl from '/imports/services/formatWebsiteUrl';
import meteorDataContainer from '/imports/services/meteorDataContainer';
import asyncDataContainer from '/imports/services/asyncDataContainer';
import mergeDocuments from '/imports/services/mergeDocuments';
import PartupsView from './PartupsView';
import Debug from '/imports/Debug';
import { UserModel, ImageModel, PartupModel } from '/imports/models';

const PARTUPS_PER_PAGE = 10;
let partnerPartupsLoading = false;
let partnerPartupsEnd = false;
let partnerPartupsPage = 0;
let partnerPartupsCache = [];
let supporterPartupsPage = 0;
let supporterPartupsCache = [];
let supporterPartupsLoading = false;
let supporterPartupsEnd = false;

const myAsyncDataContainer = asyncDataContainer(PartupsView, {}, (props, cb, isFirstTime) => {
    const changed = () => {
        cb({
            requestMorePartnerPartups,
            requestMoreSupporterPartups,
            partnerPartups: partnerPartupsCache,
            supporterPartups: supporterPartupsCache,
            partnerPartupsLoading,
            partnerPartupsEnd,
            supporterPartupsLoading,
            supporterPartupsEnd,
        });
    };

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

    const baseUrl = formatWebsiteUrl({pathname: `/users/${props.loggedInUser._id}`});

    const getQueryString = (page) => encodeQueryString({
        userId: props.loggedInUser._id,
        token: props.storedLoginToken,
        archived: false,
        limit: page * PARTUPS_PER_PAGE,
        skip: page * PARTUPS_PER_PAGE - PARTUPS_PER_PAGE
    });

    const requestMorePartnerPartups = (cb) => {
        partnerPartupsLoading = true;
        changed();
        partnerPartupsPage ++;

        const beforeAmount = partnerPartupsCache.length;
        getPartupsPromise(`${baseUrl}/upperpartups/${getQueryString(partnerPartupsPage)}`)
        .then((partups) => {
            mergeDocuments(partnerPartupsCache, partups);
            if (beforeAmount === partnerPartupsCache.length) {
                partnerPartupsEnd = true;
            }
            partnerPartupsLoading = false;
            changed();
            if (cb) cb();
        });
    };

    const requestMoreSupporterPartups = (cb) => {
        supporterPartupsLoading = true;
        changed();
        supporterPartupsPage ++;

        const beforeAmount = supporterPartupsCache.length;
        getPartupsPromise(`${baseUrl}/supporterpartups/${getQueryString(supporterPartupsPage)}`)
        .then((partups) => {
            mergeDocuments(supporterPartupsCache, partups);
            if (beforeAmount === supporterPartupsCache.length) {
                supporterPartupsEnd = true;
            }
            supporterPartupsLoading = false;
            changed();
            if (cb) cb();
        });
    };

    if (isFirstTime) {
        partnerPartupsLoading = false;
        partnerPartupsEnd = false;
        partnerPartupsPage = 0;
        partnerPartupsCache = [];
        supporterPartupsPage = 0;
        supporterPartupsCache = [];
        supporterPartupsLoading = false;
        supporterPartupsEnd = false;

        requestMorePartnerPartups(() => {
            requestMoreSupporterPartups();
        });
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
        storedLoginToken,
        partnerPartups: [],
        supporterPartups: [],
        requestMorePartnerPartups: () => {},
        requestMoreSupporterPartups: () => {}
    };
});
