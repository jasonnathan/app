'use strict';

import { Meteor } from 'meteor/meteor';
import { AccountsClient } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import Connection from './Connection';
import formatWebsiteUrl from './services/formatWebsiteUrl';
import { LinkMeteorCollection } from 'part-up-js-helpers';
import {
    ActivityModel,
    ImageModel,
    NetworkModel,
    NotificationModel,
    PartupModel,
    PartupUpdateModel,
    UserModel
} from 'part-up-js-models'

const linker = new LinkMeteorCollection(Mongo, Connection);
const SETTINGS = {
    awsRegion: Meteor.settings.public.aws.region,
    awsBucket: Meteor.settings.public.aws.bucket,
    makeAbsoluteUrl: formatWebsiteUrl
};

UserModel.accountsClient = new AccountsClient({
    connection: Connection
});

linker.link(ActivityModel, 'activities');
linker.link(ImageModel, 'cfs.images.filerecord');
linker.link(NetworkModel, 'networks');
linker.link(NotificationModel, 'notifications');
linker.link(PartupModel, 'partups');
linker.link(PartupUpdateModel, 'updates');
linker.link(UserModel, UserModel.accountsClient.users);

ActivityModel.settings =
ImageModel.settings =
NetworkModel.settings =
NotificationModel.settings =
PartupModel.settings =
PartupUpdateModel.settings =
UserModel.settings =
SETTINGS;

export {
    ActivityModel as ActivityModel,
    ImageModel as ImageModel,
    NetworkModel as NetworkModel,
    NotificationModel as NotificationModel,
    PartupModel as PartupModel,
    PartupUpdateModel as PartupUpdateModel,
    UserModel as UserModel
};

export default {
    ActivityModel,
    ImageModel,
    NetworkModel,
    NotificationModel,
    PartupModel,
    PartupUpdateModel,
    UserModel
};
