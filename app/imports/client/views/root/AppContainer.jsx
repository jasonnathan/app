'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/client/services/meteorDataContainer';
import Subs from '/imports/client/Subs';
import AppViewManager from '/imports/client/views/root/AppViewManager';
import transitionTo from '/imports/client/services/transitionTo';
import { UserModel, ChatModel } from '/imports/client/models';
import Debug from '/imports/client/Debug';

export default meteorDataContainer(AppViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    const loggedInSub = Subs.subscribe('users.loggedin');
    const user = UserModel.accountsClient.user();
    if (loggedInSub.ready()) {
        if (!user) {
            transitionTo('root:login', {
                transition: 'show-from-right'
            });
        }
    }

    // Unread messages
    Subs.subscribe('chats.for_loggedin_user.for_count', {private: true, networks: true});
    ChatModel.find().fetch(); // trigger re-render

    return {};
});
