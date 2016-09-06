'use strict';

import { defer } from 'lodash';
import { mixIn } from 'mout/object';
import TouchstoneApp from '/imports/client/TouchstoneApp';

const transitionTo = (destination, options) => {
    const path = destination.split(':');
    const app = TouchstoneApp.get();

    let currentIndex = 0;
    const go = (index) => {
        const _destination = `${path[currentIndex]}:${path[currentIndex + 1]}`;
        const isLast = currentIndex === path.length - 2;
        const _options = isLast ? options : mixIn({}, options, {viewProps: {}});

        defer(() => {
            app.transitionTo(_destination, _options);
        });

        if (!isLast) {
            currentIndex ++;
            go(currentIndex);
        }
    };

    go(currentIndex);
};

window.transitionTo = transitionTo;

export default transitionTo;
