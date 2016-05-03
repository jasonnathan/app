'use strict';

import { check, Match } from 'meteor/check';
import moment from 'moment';

export default {
    relativeWithThreshold: (targetDate, nowDate) => {
        check(targetDate, Date);
        check(nowDate, Match.Optional(Date));

        const RELATIVE_TIME_THRESHOLD = 7 * 24 * 60 * 60 * 1000; // <-- 1 week

        const targetMoment = moment(targetDate);
        const nowMoment = moment(nowDate || new Date());

        if (nowMoment.diff(targetMoment) < RELATIVE_TIME_THRESHOLD) { // <-- less than 1 week ago
            return targetMoment.fromNow(true);
        } else if (targetMoment.year() === nowMoment.year()) { // <-- less than a year ago
            return targetMoment.format('dd, MMMM D [at] h:mm A');
        } else { // <-- more than a year ago
            return targetMoment.format('MMMM D YYYY [at] h:mm A');
        }
    }
};
