'use strict';

import { defer } from 'lodash';

import TouchstoneApp from '/imports/TouchstoneApp';

const transitionTo = (destination, options) => {
    defer(() => {
        TouchstoneApp.get().transitionTo(destination, options);
    });
};

export default transitionTo;
