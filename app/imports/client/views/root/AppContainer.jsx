'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import Subs from '/imports/client/Subs';
import AppViewManager from '/imports/client/views/root/AppViewManager';
import transitionTo from '/imports/client/services/transitionTo';
import { UserModel, ChatModel } from '/imports/client/models';
import Debug from '/imports/client/Debug';

const redirectToLogin = () => {
    transitionTo('root:login', {
        transition: 'show-from-right'
    });
};

export default meteorDataContainer(AppViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    if (!UserModel.accountsClient.userId()) {
        redirectToLogin();
    }

    Subs.subscribe('users.loggedin', {
        onReady: () => {
            if (!UserModel.accountsClient.user()) {
                redirectToLogin();
            }
        }
    });

    // Unread messages
    Subs.subscribe('chats.for_loggedin_user.for_count', {private: true, networks: true});
    ChatModel.find().fetch(); // trigger re-render

    return {};
});
