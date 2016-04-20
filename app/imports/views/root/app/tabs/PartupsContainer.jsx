'use strict';

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { encode as encodeQueryString } from 'mout/queryString';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import asyncDataContainer from '/imports/helpers/asyncDataContainer';
import PartupsView from './PartupsView';
import Debug from '/imports/Debug';
import UserModel from '/imports/models/UserModel';
import PartupModel from '/imports/models/PartupModel';

const myAsyncDataContainer = asyncDataContainer(PartupsView, {
    shouldComponentUpdate: (props, nextProps) => {
        return true;
    }
}, (props, cb) => {
    const queryString = encodeQueryString({
        userId: props.loggedInUser._id,
        token: props.storedLoginToken,
        archived: false
    });

    const baseUrl = `${Meteor.settings.public.server}/users/${props.loggedInUser._id}`;

    /**
     * Use promise to call callback after
     * both HTTP-calls are complete
     */
    Promise.all([

        /**
         * Get Part-ups the user is supporter of
         */
        new Promise((resolve, reject) => {
            HTTP.get(`${baseUrl}/supporterpartups/${queryString}`, function(error, response) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(response.data.partups.map((partup) => {
                    return new PartupModel(partup);
                }));
            });
        }),

        /**
         * Get Part-ups the user is partner of
         */
        new Promise((resolve, reject) => {
            HTTP.get(`${baseUrl}/upperpartups/${queryString}`, function(error, response) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(response.data.partups.map((partup) => {
                    return new PartupModel(partup);
                }));
            });
        }),
    ])
    .then((results) => {
        cb({
            supporterPartups: results[0],
            partnerPartups: results[1]
        });
    });
});

export default meteorDataContainer(myAsyncDataContainer, (props) => {
    const {} = props;
    Debug.tracker('PartupsContainer');

    const accounts = UserModel.getAccounts();
    const loggedInUser = accounts.user();
    const storedLoginToken = accounts._storedLoginToken();

    return {
        loggedInUser,
        storedLoginToken,
        supporterPartups: [],
        partnerPartups: []
    };
});
