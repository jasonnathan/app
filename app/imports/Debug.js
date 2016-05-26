'use strict';

import debug from 'debug';

// Enable a selection of debug scopes with 'Connection|MyDebugger|Etc'
debug.enable('*');

export default {
    conn: debug('Connection'),
    method: debug('Method'),
    methodResult: debug('Method result'),
    tracker: debug('Tracker')
};
