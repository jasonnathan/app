'use strict';

const userCache = {
    _caches: {},
    set: (key, value) => {
        userCache._caches[key] = value;
    },
    get: (key) => {
        return userCache._caches[key];
    },
    delete: (key) => {
        delete userCache._caches[key];
    },
    clearAll: () => {
        userCache._caches = {};
    }
};

export default userCache;
