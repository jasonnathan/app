'use strict';

import { isString, isObject } from 'mout/lang';
import { append } from 'mout/array';
import { forOwn } from 'mout/object';

export default (...args) => {
    let classes = [];

    args.forEach((arg) => {
        if (isString(arg)) {
            append(classes, arg.split(' '));
        }

        if (isObject(arg)) {
            forOwn(arg, (value, key) => {
                if (value) {
                    classes.push(key);
                }
            });
        }
    });

    return classes.join(' ');
}
