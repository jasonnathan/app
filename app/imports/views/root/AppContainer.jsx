'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import Subs from '/imports/Subs';
import AppViewManager from '/imports/views/root/AppViewManager';
import transitionTo from '/imports/services/transitionTo';
import { UserModel, ChatMessageModel } from '/imports/models';
import Debug from '/imports/Debug';

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

    Subs.subscribe('chats.unread_messages_for_count', {private: true});
    Subs.subscribe('users.loggedin', {
        onReady: () => {
            if (!UserModel.accountsClient.user()) {
                redirectToLogin();
            }
        }
    });

    ChatMessageModel.find().fetch(); // trigger re-render

    return {};
});
