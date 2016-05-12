'use strict';

export default function(message) {
    return message
        .replace(/\[Supporters:([^\]]*)\]/g, 'Supporters')
        .replace(/\[Partners:([^\]]*)\]/g, 'Partners')
        .replace(/\[user:([^\]|]+)\|([^\]]*)\]/g, (m, userId, name) => name);
}
