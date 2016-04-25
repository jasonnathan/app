'use strict';

import { createContainer } from 'meteor/react-meteor-data';

import _fixWrappedComponentForTouchstone from './_fixWrappedComponentForTouchstone';

export default function meteorDataContainer(Component, getReactiveProps) {
    const container = createContainer(getReactiveProps, Component);
    _fixWrappedComponentForTouchstone(Component, container);
    return container;
};
