'use strict';

import { check, Match } from 'meteor/check';
import remove from 'mout/array';

const WEB_ROUTES = {
    'network': '/tribes/:slug',
    'network-uppers': '/tribes/:slug/uppers',
    'network-settings-requests': '/tribes/:slug/settings/requests',
    'partup': '/partups/:slug',
    'partup-update': '/partups/:slug/updates/:update_id',
    'partup-activities': '/partups/:slug/activities'
};

export default function getWebsitePathFor(name, parameters) {
    check(name, Match.OneOf.apply(null, Object.keys(WEB_ROUTES)));

    let route = WEB_ROUTES[name];

    route
        .split('/')
        .filter((route) => {
            return route[0] === ':';
        })
        .map((route) => {
            return route.substring(1);
        })
        .forEach((param) => {
            const value = parameters[param];
            check(value, String);

            const urlPart = new RegExp(`:${param}`, 'g');
            route = route.replace(urlPart, value);
        });

    return route;
};
