'use strict';

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import Router from '../imports/Router';

Meteor.startup(() => {
    render(<Router />, document.getElementById('react-root'));
});
