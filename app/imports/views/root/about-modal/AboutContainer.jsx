'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/services/meteorDataContainer';
import AboutView from './AboutView';
import Debug from '/imports/Debug';

export default meteorDataContainer(AboutView, (props) => {
    const {} = props;
    Debug.tracker('AboutContainer');

    const onLogout = function(callback) {
        Meteor.logout(callback);
    };

    return {
        onLogout
    };
});
