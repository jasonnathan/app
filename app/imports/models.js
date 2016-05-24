'use strict';

import { Meteor } from 'meteor/meteor';
import { AccountsClient } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import Connection from './Connection';
import formatWebsiteUrl from './services/formatWebsiteUrl';
import { LinkMeteorCollection } from 'part-up-js-helpers';
import models from 'part-up-js-models';

const linker = new LinkMeteorCollection(Mongo, Connection);
const SETTINGS = {
    awsRegion: Meteor.settings.public.aws.region,
    awsBucket: Meteor.settings.public.aws.bucket,
    makeAbsoluteUrl: formatWebsiteUrl
};

models.UserModel.accountsClient = new AccountsClient({
    connection: Connection
});

const collections = {
    ActivityModel: 'activities',
    ImageModel: 'cfs.images.filerecord',
    NetworkModel: 'networks',
    NotificationModel: 'notifications',
    PartupModel: 'partups',
    PartupUpdateModel: 'updates',
    UserModel: models.UserModel.accountsClient.users
};

for (let key in models) {
    const model = models[key];
    const collection = collections[key];
    linker.link(model, collection);
    model.settings = SETTINGS;
}

export const ActivityModel = models.ActivityModel;
export const ImageModel = models.ImageModel;
export const NetworkModel = models.NetworkModel;
export const NotificationModel = models.NotificationModel;
export const PartupModel = models.PartupModel;
export const PartupUpdateModel = models.PartupUpdateModel;
export const UserModel = models.UserModel;
export default models;
