'use strict';

import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from '/imports/i18n';
import RootContainer from '/imports/views/RootContainer';

const renderMain = () => {
    render(
        <I18nextProvider i18n={i18n}><RootContainer /></I18nextProvider>,
        document.getElementById('react-root')
    );
};

Meteor.startup(() => {
    if (!window.cordova) {
        renderMain();
    } else {
        document.addEventListener('deviceready', renderMain, false);
    }
});
