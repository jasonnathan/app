'use strict';

import { Meteor } from 'meteor/meteor';

// More info at:
// http://stackoverflow.com/a/24825466/2803759
Meteor.startup(() => {
    Reload._onMigrate('LiveUpdate', function() {
        return [false];
    });
});
