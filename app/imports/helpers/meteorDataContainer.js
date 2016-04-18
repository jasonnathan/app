'use strict';

import { extend } from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';

export default function meteorDataContainer(nestedReactComponent, getReactiveProps) {
    const container = createContainer(getReactiveProps, nestedReactComponent);

    /**
     * Pass static variables required by touchstonejs's <View />
     */
    container.navigationBar = nestedReactComponent.navigationBar;
    container.getNavigation = nestedReactComponent.getNavigation;

    return container;
};
