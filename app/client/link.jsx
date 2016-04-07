'use strict';

import React from 'react';
import { render } from 'react-dom';
import Main from '../imports/views/Main';

const renderMain = () => {
    if (window.StatusBar) {
        window.StatusBar.styleDefault();
    }

    render(<Main />, document.getElementById('react-root'));
};

Meteor.startup(() => {
    if (!window.cordova) {
        renderMain();
    } else {
        document.addEventListener('deviceready', renderMain, false);
    }
});
