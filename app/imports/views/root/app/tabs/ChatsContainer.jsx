'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import ChatsView from './ChatsView';
import Debug from '/imports/Debug';

export default meteorDataContainer(ChatsView, (props) => {
    const {} = props;
    Debug.tracker('ChatsContainer');

    const onLogout = function(callback) {
        Meteor.logout(callback);
    };

    return {
        onLogout
    };
});
