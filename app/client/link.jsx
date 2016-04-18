'use strict';

import React from 'react';
import { render } from 'react-dom';
import RootViewManager from '../imports/components/views/RootViewManager';

const renderMain = () => {
    render(<RootViewManager />, document.getElementById('react-root'));
};

Meteor.startup(() => {
    if (!window.cordova) {
        renderMain();
    } else {
        document.addEventListener('deviceready', renderMain, false);
    }
});
