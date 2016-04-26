'use strict';

import { createContainer } from 'meteor/react-meteor-data';

import passPropsForTouchstone from './passPropsForTouchstone';

export default function meteorDataContainer(Component, getReactiveProps) {
    return passPropsForTouchstone(
        createContainer(getReactiveProps, Component),
        Component
    );
};
