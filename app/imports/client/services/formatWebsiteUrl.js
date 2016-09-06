'use strict';

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import url from 'url';

export default function formatWebsiteUrl(opts) {
    opts = opts || {};
    check(opts, Object);
    check(opts.pathname, Match.Optional(String));
    check(opts.search, Match.Optional(String));
    check(opts.hash, Match.Optional(String));

    let server = Meteor.settings.public.server;
    check(server, String);

    if (Meteor.settings.public.environment === 'development') {
        const storedIp = window.localStorage.getItem('ip');

        if (storedIp) {
            server = server.replace('localhost', storedIp);
        }
    }

    const serverParts = url.parse(server);

    return url.format({
        protocol: serverParts.protocol,
        host: serverParts.host,
        pathname: opts.pathname,
        search: opts.search,
        hash: opts.hash
    });
};
