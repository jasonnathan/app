'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import Subs from '/imports/Subs';
import AppViewManager from '/imports/views/root/AppViewManager';
import transitionTo from '/imports/services/transitionTo';
import { UserModel } from '/imports/models';
import Debug from '/imports/Debug';

export default meteorDataContainer(AppViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    Subs.subscribe('users.loggedin');

    if (!UserModel.accountsClient._loggingIn && !Meteor.userId()) {
        transitionTo('root:app', {
            transition: 'show-from-right'
        });
    }

    return {};
});
