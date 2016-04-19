'use strict';

import { Meteor } from 'meteor/meteor';
import App from '../App';

const transitionTo = (destination, options) => {
    Meteor.defer(() => {
        App.get().transitionTo(destination, options);
    });
};

export default transitionTo;
