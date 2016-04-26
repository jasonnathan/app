'use strict';

import { Meteor } from 'meteor/meteor';

import TouchstoneApp from '/imports/TouchstoneApp';

const transitionTo = (destination, options) => {
    Meteor.defer(() => {
        TouchstoneApp.get().transitionTo(destination, options);
    });
};

export default transitionTo;
