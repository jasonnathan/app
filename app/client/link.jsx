'use strict';

import React from 'react';
import { render } from 'react-dom';
import App from '../imports/components/App';

const startApp = () => {
    if (window.StatusBar) {
        window.StatusBar.styleDefault();
    }

    render(<App />, document.getElementById('react-root'));
};

Meteor.startup(() => {
    if (!window.cordova) {
        startApp();
    } else {
        document.addEventListener('deviceready', startApp, false);
    }
});
