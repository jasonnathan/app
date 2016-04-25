'use strict';

const PASS_PROPS_FOR_TOUCHSTONE = [
    'navigationBar',
    'getNavigation'
];

/**
 * Pass statics required by touchstonejs
 */
export default function passPropsForTouchstone(To, From) {
    PASS_PROPS_FOR_TOUCHSTONE.forEach((prop) => {
        To[prop] = From[prop];
    });

    return To;
};
