'use strict';

import debug from 'debug';

// Enable a selection of debug scopes with 'Connection|MyDebugger|Etc'
debug.enable('*');

// Specify debug scopes here
export default {
    conn: debug('Connection')
};
