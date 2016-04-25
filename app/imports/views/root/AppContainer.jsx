'use strict';

import { Meteor } from 'meteor/meteor';

import meteorDataContainer from '/imports/helpers/meteorDataContainer';
import AppViewManager from '/imports/views/root/AppViewManager';
import transitionTo from '/imports/helpers/transitionTo';
import Debug from '/imports/Debug';

export default meteorDataContainer(AppViewManager, (props) => {
    const {} = props;
    Debug.tracker('AppContainer');

    // If user is not logged in, redirect to login screen
    if (!Meteor.userId()) {
        transitionTo('root:login', {
            transition: 'reveal-from-right'
        });
    }

    return {};
});