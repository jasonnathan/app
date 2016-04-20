'use strict';

import { createContainer } from 'meteor/react-meteor-data';

import fixWrappedComponentForTouchstone from './fixWrappedComponentForTouchstone';

export default function meteorDataContainer(Component, getReactiveProps) {
    const container = createContainer(getReactiveProps, Component);
    fixWrappedComponentForTouchstone(Component, container);
    return container;
};
