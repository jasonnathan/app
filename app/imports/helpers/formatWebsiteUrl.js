'use strict';

import { check, Match } from 'meteor/check';
import url from 'url';

export default function formatWebsiteUrl(opts) {
    opts = opts || {};
    check(opts, Object);
    check(opts.pathname, Match.Optional(String));
    check(opts.search, Match.Optional(String));
    check(opts.hash, Match.Optional(String));

    const server = Meteor.settings.public.server;
    check(server, String);

    const website = url.parse(Meteor.settings.public.server);

    return url.format({
        protocol: website.protocol,
        host: website.host,
        pathname: opts.pathname,
        search: opts.search,
        hash: opts.hash
    });
};
